//@ts-nocheck

import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
  AsYouType,
  formatIncompletePhoneNumber,
  //eslint-disable-next-line
  Metadata
} from "libphonenumber-js/core";

/**
 * Parses a E.164 phone number to an instance of `PhoneNumber` class.
 * @param {string?} value = E.164 phone number.
 * @param  {object} metadata - `libphonenumber-js` metadata
 * @return {object} Object having shape `{ country: string?, countryCallingCode: string, number: string }`. `PhoneNumber`: https://gitlab.com/catamphetamine/libphonenumber-js#phonenumber.
 * @example
 * parsePhoneNumber('+78005553535')
 */
export function parsePhoneNumber(value, metadata) {
  return parsePhoneNumberFromString(value || "", metadata);
}

/**
 * Generates national number digits for a parsed phone.
 * May prepend national prefix.
 * The phone number must be a complete and valid phone number.
 * @param  {object} phoneNumber - An instance of `PhoneNumber` class.
 * @param  {object} metadata - `libphonenumber-js` metadata
 * @return {string}
 * @example
 * getNationalNumberDigits({ country: 'RU', phone: '8005553535' })
 * // returns '88005553535'
 */
export function generateNationalNumberDigits(phoneNumber) {
  return phoneNumber.formatNational().replace(/\D/g, "");
}

/**
 * Converts phone number digits to a (possibly incomplete) E.164 phone number.
 * @param  {string?} number - A possibly incomplete phone number digits string. Can be a possibly incomplete E.164 phone number.
 * @param  {string?} country
 * @param  {[object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */
export function e164(number, country, metadata) {
  if (!number) {
    return;
  }
  // If the phone number is being input in international format.
  if (number[0] === "+") {
    // If it's just the `+` sign then return nothing.
    if (number === "+") {
      return;
    }
    // If there are any digits then the `value` is returned as is.
    return number;
  }
  // For non-international phone numbers
  // an accompanying country code is required.
  if (!country) {
    return;
  }
  const partial_national_significant_number = getNationalSignificantNumberDigits(
    number,
    country,
    metadata
  );
  if (partial_national_significant_number) {
    return `+${getCountryCallingCode(
      country,
      metadata
    )}${partial_national_significant_number}`;
  }
}

// If the phone number being input is an international one
// then tries to derive the country from the phone number.
// (regardless of whether there's any country currently selected)
/**
 * @param {string} parsedInput - A possibly incomplete E.164 phone number.
 * @param {string?} country - Currently selected country.
 * @param {string[]?} countries - A list of available countries. If not passed then "all countries" are assumed.
 * @param {boolean} includeInternationalOption - Whether "International" country option is available.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */
export function getCountryForPartialE164Number(
  partialE164Number,
  country,
  countries,
  includeInternationalOption,
  metadata
) {
  if (partialE164Number === "+") {
    // Don't change the currently selected country yet.
    return country;
  }

  const derived_country = get_country_from_possibly_incomplete_international_phone_number(
    partialE164Number,
    metadata
  );

  // If a phone number is being input in international form
  // and the country can already be derived from it,
  // then select that country.
  if (
    derived_country &&
    (!countries || countries.indexOf(derived_country) >= 0)
  ) {
    return derived_country;
  }
  // If "International" country option has not been disabled
  // and the international phone number entered doesn't correspond
  // to the currently selected country then reset the currently selected country.
  else if (
    country &&
    includeInternationalOption &&
    !could_number_belong_to_country(partialE164Number, country, metadata)
  ) {
    return undefined;
  }

  // Don't change the currently selected country.
  return country;
}

/**
 * Parses `<input/>` value. Derives `country` from `input`. Derives an E.164 `value`.
 * @param  {string?} input — Parsed `<input/>` value. Examples: `""`, `"+"`, `"+123"`, `"123"`.
 * @param  {string?} prevInput — Previous parsed `<input/>` value. Examples: `""`, `"+"`, `"+123"`, `"123"`.
 * @param  {string?} country - Currently selected country.
 * @param  {string[]?} countries - A list of available countries. If not passed then "all countries" are assumed.
 * @param  {boolean} includeInternationalOption - Whether "International" country option is available.
 * @param  {boolean} international - Set to `true` to force international phone number format (leading `+`).
 * @param  {boolean} limitMaxLength — Whether to enable limiting phone number max length.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {object} An object of shape `{ input, country, value }`.
 */
export function parseInput(
  input,
  prevInput,
  country,
  defaultCountry,
  countries,
  includeInternationalOption,
  international,
  metadata
) {
  // If this `onChange()` event was triggered
  // as a result of selecting "International" country
  // then force-prepend a `+` sign if the phone number
  // `<input/>` value isn't in international format.
  // Also, force-prepend a `+` sign if international
  // phone number input format is set.
  if (input && input[0] !== "+" && (!country || international)) {
    input = "+" + input;
  }

  // If the previously entered phone number
  // has been entered in international format
  // and the user decides to erase it,
  // then also reset the `country`
  // because it was most likely automatically selected
  // while the user was typing in the phone number
  // in international format.
  // This fixes the issue when a user is presented
  // with a phone number input with no country selected
  // and then types in their local phone number
  // then discovers that the input's messed up
  // (a `+` has been prepended at the start of their input
  //  and a random country has been selected),
  // decides to undo it all by erasing everything
  // and then types in their local phone number again
  // resulting in a seemingly correct phone number
  // but in reality that phone number has incorrect country.
  // https://github.com/catamphetamine/react-phone-number-input/issues/273
  if (!input && prevInput && prevInput[0] === "+") {
    if (international) {
      country = undefined;
    } else {
      country = defaultCountry;
    }
  }
  // Also resets such "randomly" selected country
  // as soon as the user erases the number
  // digit-by-digit up to the leading `+` sign.
  if (
    input === "+" &&
    prevInput &&
    prevInput[0] === "+" &&
    prevInput.length > "+".length
  ) {
    country = undefined;
  }

  // Generate the new `value` property.
  let value;
  if (input) {
    if (input[0] === "+") {
      if (input !== "+") {
        value = input;
      }
    } else {
      value = e164(input, country, metadata);
    }
  }

  // Derive the country from the phone number.
  // (regardless of whether there's any country currently selected)
  if (value) {
    country = getCountryForPartialE164Number(
      value,
      country,
      countries,
      includeInternationalOption,
      metadata
    );
  }

  return {
    input,
    country,
    value
  };
}

/**
 * Determines the country for a given (possibly incomplete) E.164 phone number.
 * @param  {string} number - A possibly incomplete E.164 phone number.
 * @param  {object} metadata - `libphonenumber-js` metadata.
 * @return {string?}
 */
export function get_country_from_possibly_incomplete_international_phone_number(
  number,
  metadata
) {
  const formatter = new AsYouType(null, metadata);
  formatter.input(number);
  // // `001` is a special "non-geograpical entity" code
  // // in Google's `libphonenumber` library.
  // if (formatter.country === '001') {
  // 	return
  // }
  return formatter.country;
}

/**
 * Parses a partially entered national phone number digits
 * (or a partially entered E.164 international phone number)
 * and returns the national significant number part.
 * National significant number returned doesn't come with a national prefix.
 * @param {string} number - National number digits. Or possibly incomplete E.164 phone number.
 * @param {string?} country
 * @param {object} metadata - `libphonenumber-js` metadata.
 * @return {string} [result]
 */
export function getNationalSignificantNumberDigits(number, country, metadata) {
  // Create "as you type" formatter.
  const formatter = new AsYouType(country, metadata);
  // Input partial national phone number.
  formatter.input(number);
  // Return the parsed partial national phone number.
  const phoneNumber = formatter.getNumber();
  return phoneNumber && phoneNumber.nationalNumber;
}

/**
 * Checks if a partially entered E.164 phone number could belong to a country.
 * @param  {string} number
 * @param  {string} country
 * @return {boolean}
 */
export function could_number_belong_to_country(number, country, metadata) {
  const country_calling_code = getCountryCallingCode(country, metadata);

  let i = 0;
  while (i + 1 < number.length && i < country_calling_code.length) {
    if (number[i + 1] !== country_calling_code[i]) {
      return false;
    }
    i++;
  }

  return true;
}

export function getInitialParsedInput(value, country, international, metadata) {
  // If `international` property is `true`,
  // then always show country calling code in the input field.
  if (!value && international && country) {
    return `+${getCountryCallingCode(country, metadata)}`;
  }
  return value;
}

export function generateInitialParsedInput(
  value,
  phoneNumber,
  { international, defaultCountry, metadata, displayInitialValueAsLocalNumber }
) {
  // If the `value` (E.164 phone number)
  // belongs to the currently selected country
  // and `displayInitialValueAsLocalNumber` property is `true`
  // then convert `value` (E.164 phone number)
  // to a local phone number digits.
  // E.g. '+78005553535' -> '88005553535'.
  if (displayInitialValueAsLocalNumber && phoneNumber && phoneNumber.country) {
    return generateNationalNumberDigits(phoneNumber);
  }
  return getInitialParsedInput(value, defaultCountry, international, metadata);
}

export function formatNumber(
  val,
  country,
  defaultCountry,
  metadata,
  international
) {
  const phoneNumber = parsePhoneNumber(val, metadata);
  let value = generateInitialParsedInput(val, phoneNumber, {
    international,
    defaultCountry,
    metadata,
    displayInitialValueAsLocalNumber: false
  });

  value = value.replace(/ /g, "");

  const formated = formatIncompletePhoneNumber(val, country, metadata);
  return {
    country: phoneNumber ? phoneNumber.country : country,
    value,
    formated
  };
}

export function isValidPhoneNumber(value, metadata) {
  if (!value) {
    return false;
  }
  const phoneNumber = parsePhoneNumberFromString(value, metadata);
  if (!phoneNumber) {
    return false;
  }
  return phoneNumber.isValid();
}
