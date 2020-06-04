export interface ICountry {
  label: string;
  value: string;
  emoji: string;
  phoneCode: string;
}

const countries: ICountry[] = [
  {
    "label": "Canada",
    "value": "CA",
    "emoji": "🇨🇦",
    "phoneCode": "1"
  },
  {
    "label": "United States",
    "value": "US",
    "emoji": "🇺🇸",
    "phoneCode": "1"
  },
  {
    "label": "Bahamas",
    "value": "BS",
    "emoji": "🇧🇸",
    "phoneCode": "1242"
  },
  {
    "label": "Barbados",
    "value": "BB",
    "emoji": "🇧🇧",
    "phoneCode": "1246"
  },
  {
    "label": "Anguilla",
    "value": "AI",
    "emoji": "🇦🇮",
    "phoneCode": "1264"
  },
  {
    "label": "Antigua and Barbuda",
    "value": "AG",
    "emoji": "🇦🇬",
    "phoneCode": "1268"
  },
  {
    "label": "Virgin Islands, US",
    "value": "VI",
    "phoneCode": "1284",
    "emoji": "🇻🇮"
  },
  {
    "label": "Virgin Islands, British",
    "value": "VG",
    "emoji": "🇻🇬",
    "phoneCode": "1340"
  },
  {
    "label": "Cayman Islands",
    "value": "KY",
    "emoji": "🇰🇾",
    "phoneCode": "1345"
  },
  {
    "label": "Bermuda",
    "value": "BM",
    "emoji": "🇧🇲",
    "phoneCode": "1441"
  },
  {
    "label": "Grenada",
    "value": "GD",
    "emoji": "🇬🇩",
    "phoneCode": "1473"
  },
  {
    "label": "Turks and Caicos Islands",
    "value": "TC",
    "emoji": "🇹🇨",
    "phoneCode": "1649"
  },
  {
    "label": "Montserrat",
    "value": "MS",
    "emoji": "🇲🇸",
    "phoneCode": "1664"
  },
  {
    "label": "Guam",
    "value": "GU",
    "emoji": "🇬🇺",
    "phoneCode": "1671"
  },
  {
    "label": "American Samoa",
    "value": "AS",
    "emoji": "🇦🇸",
    "phoneCode": "1684"
  },
  {
    "label": "Saint Maarten (Dutch Part)",
    "value": "SX",
    "emoji": "🇳🇱",
    "phoneCode": "1721"
  },
  {
    "label": "Saint Lucia",
    "value": "LC",
    "emoji": "🇱🇨",
    "phoneCode": "1758"
  },
  {
    "label": "Dominica",
    "value": "DM",
    "emoji": "🇩🇲",
    "phoneCode": "1767"
  },
  {
    "label": "Saint Vincent and The Grenadines",
    "value": "VC",
    "emoji": "🇻🇨",
    "phoneCode": "1784"
  },
  {
    "label": "Puerto Rico",
    "value": "PR",
    "emoji": "🇵🇷",
    "phoneCode": "1787"
  },
  {
    "label": "Dominican Republic",
    "value": "DO",
    "emoji": "🇩🇴",
    "phoneCode": "1809"
  },
  {
    "label": "Trinidad and Tobago",
    "value": "TT",
    "emoji": "🇹🇹",
    "phoneCode": "1868"
  },
  {
    "label": "Saint Kitts and Nevis",
    "value": "KN",
    "emoji": "🇰🇳",
    "phoneCode": "1869"
  },
  {
    "label": "Jamaica",
    "value": "JM",
    "emoji": "🇯🇲",
    "phoneCode": "1876"
  },
  {
    "label": "Egypt",
    "value": "EG",
    "emoji": "🇪🇬",
    "phoneCode": "20"
  },
  {
    "label": "Morocco",
    "value": "MA",
    "emoji": "🇲🇦",
    "phoneCode": "212"
  },
  {
    "label": "Algeria",
    "value": "DZ",
    "emoji": "🇩🇿",
    "phoneCode": "213"
  },
  {
    "label": "Tunisia",
    "value": "TN",
    "emoji": "🇹🇳",
    "phoneCode": "216"
  },
  {
    "label": "Libya",
    "value": "LY",
    "emoji": "🇱🇾",
    "phoneCode": "218"
  },
  {
    "label": "Gambia",
    "value": "GM",
    "emoji": "🇬🇲",
    "phoneCode": "220"
  },
  {
    "label": "Senegal",
    "value": "SN",
    "emoji": "🇸🇳",
    "phoneCode": "221"
  },
  {
    "label": "Mauritania",
    "value": "MR",
    "emoji": "🇲🇷",
    "phoneCode": "222"
  },
  {
    "label": "Mali",
    "value": "ML",
    "emoji": "🇲🇱",
    "phoneCode": "223"
  },
  {
    "label": "Guinea",
    "value": "GN",
    "emoji": "🇬🇳",
    "phoneCode": "224"
  },
  {
    "label": "Ivory Coast",
    "value": "CI",
    "phoneCode": "225",
    "emoji": "🇨🇮"
  },
  {
    "label": "Burkina Faso",
    "value": "BF",
    "emoji": "🇧🇫",
    "phoneCode": "226"
  },
  {
    "label": "Niger",
    "value": "NE",
    "emoji": "🇳🇪",
    "phoneCode": "227"
  },
  {
    "label": "Togo",
    "value": "TG",
    "emoji": "🇹🇬",
    "phoneCode": "228"
  },
  {
    "label": "Benin",
    "value": "BJ",
    "emoji": "🇧🇯",
    "phoneCode": "229"
  },
  {
    "label": "Mauritius",
    "value": "MU",
    "emoji": "🇲🇺",
    "phoneCode": "230"
  },
  {
    "label": "Liberia",
    "value": "LR",
    "emoji": "🇱🇷",
    "phoneCode": "231"
  },
  {
    "label": "Sierra Leone",
    "value": "SL",
    "emoji": "🇸🇱",
    "phoneCode": "232"
  },
  {
    "label": "Ghana",
    "value": "GH",
    "emoji": "🇬🇭",
    "phoneCode": "233"
  },
  {
    "label": "Nigeria",
    "value": "NG",
    "emoji": "🇳🇬",
    "phoneCode": "234"
  },
  {
    "label": "Chad",
    "value": "TD",
    "emoji": "🇹🇩",
    "phoneCode": "235"
  },
  {
    "label": "Central African Republic",
    "value": "CF",
    "emoji": "🇨🇫",
    "phoneCode": "236"
  },
  {
    "label": "Cameroon",
    "value": "CM",
    "emoji": "🇨🇲",
    "phoneCode": "237"
  },
  {
    "label": "Cape Verde",
    "value": "CV",
    "emoji": "🇨🇻",
    "phoneCode": "238"
  },
  {
    "label": "Sao Tome and Principe",
    "value": "ST",
    "emoji": "🇸🇹",
    "phoneCode": "239"
  },
  {
    "label": "Equatorial Guinea",
    "value": "GQ",
    "emoji": "🇬🇶",
    "phoneCode": "240"
  },
  {
    "label": "Gabon",
    "value": "GA",
    "emoji": "🇬🇦",
    "phoneCode": "241"
  },
  {
    "label": "Republic Of The Congo",
    "value": "CG",
    "phoneCode": "242",
    "emoji": "🇨🇬"
  },
  {
    "label": "Democratic Republic of the Congo",
    "value": "CD",
    "phoneCode": "243",
    "emoji": "🇨🇩"
  },
  {
    "label": "Angola",
    "value": "AO",
    "emoji": "🇦🇴",
    "phoneCode": "244"
  },
  {
    "label": "Guinea-Bissau",
    "value": "GW",
    "emoji": "🇬🇼",
    "phoneCode": "245"
  },
  {
    "label": "Seychelles",
    "value": "SC",
    "emoji": "🇸🇨",
    "phoneCode": "248"
  },
  {
    "label": "Sudan",
    "value": "SD",
    "emoji": "🇸🇩",
    "phoneCode": "249"
  },
  {
    "label": "Rwanda",
    "value": "RW",
    "emoji": "🇷🇼",
    "phoneCode": "250"
  },
  {
    "label": "Ethiopia",
    "value": "ET",
    "emoji": "🇪🇹",
    "phoneCode": "251"
  },
  {
    "label": "Somalia",
    "value": "SO",
    "emoji": "🇸🇴",
    "phoneCode": "252"
  },
  {
    "label": "Djibouti",
    "value": "DJ",
    "emoji": "🇩🇯",
    "phoneCode": "253"
  },
  {
    "label": "Kenya",
    "value": "KE",
    "emoji": "🇰🇪",
    "phoneCode": "254"
  },
  {
    "label": "Tanzania",
    "value": "TZ",
    "emoji": "🇹🇿",
    "phoneCode": "255"
  },
  {
    "label": "Uganda",
    "value": "UG",
    "emoji": "🇺🇬",
    "phoneCode": "256"
  },
  {
    "label": "Burundi",
    "value": "BI",
    "emoji": "🇧🇮",
    "phoneCode": "257"
  },
  {
    "label": "Mozambique",
    "value": "MZ",
    "emoji": "🇲🇿",
    "phoneCode": "258"
  },
  {
    "label": "Zambia",
    "value": "ZM",
    "emoji": "🇿🇲",
    "phoneCode": "260"
  },
  {
    "label": "Madagascar",
    "value": "MG",
    "emoji": "🇲🇬",
    "phoneCode": "261"
  },
  {
    "label": "Réunion Island",
    "value": "RE",
    "phoneCode": "262",
    "emoji": "🇷🇪"
  },
  {
    "label": "Zimbabwe",
    "value": "ZW",
    "emoji": "🇿🇼",
    "phoneCode": "263"
  },
  {
    "label": "Namibia",
    "value": "NA",
    "emoji": "🇳🇦",
    "phoneCode": "264"
  },
  {
    "label": "Malawi",
    "value": "MW",
    "emoji": "🇲🇼",
    "phoneCode": "265"
  },
  {
    "label": "Lesotho",
    "value": "LS",
    "emoji": "🇱🇸",
    "phoneCode": "266"
  },
  {
    "label": "Botswana",
    "value": "BW",
    "emoji": "🇧🇼",
    "phoneCode": "267"
  },
  {
    "label": "Swaziland",
    "value": "SZ",
    "emoji": "🇸🇿",
    "phoneCode": "268"
  },
  {
    "label": "Comoros",
    "value": "KM",
    "emoji": "🇰🇲",
    "phoneCode": "269"
  },
  {
    "label": "Mayotte",
    "value": "YT",
    "emoji": "🇾🇹",
    "phoneCode": "269"
  },
  {
    "label": "South Africa",
    "value": "ZA",
    "emoji": "🇿🇦",
    "phoneCode": "27"
  },
  {
    "label": "Eritrea",
    "value": "ER",
    "emoji": "🇪🇷",
    "phoneCode": "291"
  },
  {
    "label": "Aruba",
    "value": "AW",
    "emoji": "🇦🇼",
    "phoneCode": "297"
  },
  {
    "label": "Faroe Islands",
    "value": "FO",
    "emoji": "🇫🇴",
    "phoneCode": "298"
  },
  {
    "label": "Greenland",
    "value": "GL",
    "emoji": "🇬🇱",
    "phoneCode": "299"
  },
  {
    "label": "Greece",
    "value": "GR",
    "emoji": "🇬🇷",
    "phoneCode": "30"
  },
  {
    "label": "Netherlands",
    "value": "NL",
    "emoji": "🇳🇱",
    "phoneCode": "31"
  },
  {
    "label": "Belgium",
    "value": "BE",
    "emoji": "🇧🇪",
    "phoneCode": "32"
  },
  {
    "label": "France",
    "value": "FR",
    "emoji": "🇫🇷",
    "phoneCode": "33"
  },
  {
    "label": "Spain",
    "value": "ES",
    "emoji": "🇪🇸",
    "phoneCode": "34"
  },
  {
    "label": "Gibraltar",
    "value": "GI",
    "emoji": "🇬🇮",
    "phoneCode": "350"
  },
  {
    "label": "Portugal",
    "value": "PT",
    "emoji": "🇵🇹",
    "phoneCode": "351"
  },
  {
    "label": "Luxembourg",
    "value": "LU",
    "emoji": "🇱🇺",
    "phoneCode": "352"
  },
  {
    "label": "Ireland",
    "value": "IE",
    "emoji": "🇮🇪",
    "phoneCode": "353"
  },
  {
    "label": "Iceland",
    "value": "IS",
    "emoji": "🇮🇸",
    "phoneCode": "354"
  },
  {
    "label": "Albania",
    "value": "AL",
    "emoji": "🇦🇱",
    "phoneCode": "355"
  },
  {
    "label": "Malta",
    "value": "MT",
    "emoji": "🇲🇹",
    "phoneCode": "356"
  },
  {
    "label": "Cyprus",
    "value": "CY",
    "emoji": "🇨🇾",
    "phoneCode": "357"
  },
  {
    "label": "Finland",
    "value": "FI",
    "emoji": "🇫🇮",
    "phoneCode": "358"
  },
  {
    "label": "Bulgaria",
    "value": "BG",
    "emoji": "🇧🇬",
    "phoneCode": "359"
  },
  {
    "label": "Hungary",
    "value": "HU",
    "emoji": "🇭🇺",
    "phoneCode": "36"
  },
  {
    "label": "Lithuania",
    "value": "LT",
    "emoji": "🇱🇹",
    "phoneCode": "370"
  },
  {
    "label": "Latvia",
    "value": "LV",
    "emoji": "🇱🇻",
    "phoneCode": "371"
  },
  {
    "label": "Estonia",
    "value": "EE",
    "emoji": "🇪🇪",
    "phoneCode": "372"
  },
  {
    "label": "Moldova",
    "value": "MD",
    "emoji": "🇲🇩",
    "phoneCode": "373"
  },
  {
    "label": "Armenia",
    "value": "AM",
    "emoji": "🇦🇲",
    "phoneCode": "374"
  },
  {
    "label": "Belarus",
    "value": "BY",
    "emoji": "🇧🇾",
    "phoneCode": "375"
  },
  {
    "label": "Andorra",
    "value": "AD",
    "emoji": "🇦🇩",
    "phoneCode": "376"
  },
  {
    "label": "Monaco",
    "value": "MC",
    "emoji": "🇲🇨",
    "phoneCode": "377"
  },
  {
    "label": "San Marino",
    "value": "SM",
    "emoji": "🇸🇲",
    "phoneCode": "378"
  },
  {
    "label": "Ukraine",
    "value": "UA",
    "emoji": "🇺🇦",
    "phoneCode": "380"
  },
  {
    "label": "Serbia",
    "value": "RS",
    "emoji": "🇷🇸",
    "phoneCode": "381"
  },
  {
    "label": "Montenegro",
    "value": "ME",
    "emoji": "🇲🇪",
    "phoneCode": "382"
  },
  {
    "label": "Croatia",
    "value": "HR",
    "emoji": "🇭🇷",
    "phoneCode": "385"
  },
  {
    "label": "Slovenia",
    "value": "SI",
    "emoji": "🇸🇮",
    "phoneCode": "386"
  },
  {
    "label": "Bosnia and Herzegovina",
    "value": "BA",
    "emoji": "🇧🇦",
    "phoneCode": "387"
  },
  {
    "label": "Macedonia",
    "value": "MK",
    "emoji": "🇲🇰",
    "phoneCode": "389"
  },
  {
    "label": "Italy",
    "value": "IT",
    "emoji": "🇮🇹",
    "phoneCode": "39"
  },
  {
    "label": "Romania",
    "value": "RO",
    "emoji": "🇷🇴",
    "phoneCode": "40"
  },
  {
    "label": "Switzerland",
    "value": "CH",
    "emoji": "🇨🇭",
    "phoneCode": "41"
  },
  {
    "label": "Czech",
    "value": "CZ",
    "emoji": "🇨🇿",
    "phoneCode": "420"
  },
  {
    "label": "Slovakia",
    "value": "SK",
    "emoji": "🇸🇰",
    "phoneCode": "421"
  },
  {
    "label": "Liechtenstein",
    "value": "LI",
    "emoji": "🇱🇮",
    "phoneCode": "423"
  },
  {
    "label": "Austria",
    "value": "AT",
    "emoji": "🇦🇹",
    "phoneCode": "43"
  },
  {
    "label": "United Kingdom",
    "value": "GB",
    "emoji": "🇬🇧",
    "phoneCode": "44"
  },
  {
    "label": "Denmark",
    "value": "DK",
    "emoji": "🇩🇰",
    "phoneCode": "45"
  },
  {
    "label": "Sweden",
    "value": "SE",
    "emoji": "🇸🇪",
    "phoneCode": "46"
  },
  {
    "label": "Norway",
    "value": "NO",
    "emoji": "🇳🇴",
    "phoneCode": "47"
  },
  {
    "label": "Poland",
    "value": "PL",
    "emoji": "🇵🇱",
    "phoneCode": "48"
  },
  {
    "label": "Germany",
    "value": "DE",
    "emoji": "🇩🇪",
    "phoneCode": "49"
  },
  {
    "label": "Belize",
    "value": "BZ",
    "emoji": "🇧🇿",
    "phoneCode": "501"
  },
  {
    "label": "Guatemala",
    "value": "GT",
    "emoji": "🇬🇹",
    "phoneCode": "502"
  },
  {
    "label": "El Salvador",
    "value": "SV",
    "emoji": "🇸🇻",
    "phoneCode": "503"
  },
  {
    "label": "Honduras",
    "value": "HN",
    "emoji": "🇭🇳",
    "phoneCode": "504"
  },
  {
    "label": "Nicaragua",
    "value": "NI",
    "emoji": "🇳🇮",
    "phoneCode": "505"
  },
  {
    "label": "Costa Rica",
    "value": "CR",
    "emoji": "🇨🇷",
    "phoneCode": "506"
  },
  {
    "label": "Panama",
    "value": "PA",
    "emoji": "🇵🇦",
    "phoneCode": "507"
  },
  {
    "label": "Saint Pierre and Miquelon",
    "value": "PM",
    "emoji": "🇵🇲",
    "phoneCode": "508"
  },
  {
    "label": "Haiti",
    "value": "HT",
    "emoji": "🇭🇹",
    "phoneCode": "509"
  },
  {
    "label": "Peru",
    "value": "PE",
    "emoji": "🇵🇪",
    "phoneCode": "51"
  },
  {
    "label": "Mexico",
    "value": "MX",
    "emoji": "🇲🇽",
    "phoneCode": "52"
  },
  {
    "label": "Cuba",
    "value": "CU",
    "emoji": "🇨🇺",
    "phoneCode": "53"
  },
  {
    "label": "Argentina",
    "value": "AR",
    "emoji": "🇦🇷",
    "phoneCode": "54"
  },
  {
    "label": "Brazil",
    "value": "BR",
    "emoji": "🇧🇷",
    "phoneCode": "55"
  },
  {
    "label": "Chile",
    "value": "CL",
    "emoji": "🇨🇱",
    "phoneCode": "56"
  },
  {
    "label": "Colombia",
    "value": "CO",
    "emoji": "🇨🇴",
    "phoneCode": "57"
  },
  {
    "label": "Venezuela",
    "value": "VE",
    "emoji": "🇻🇪",
    "phoneCode": "58"
  },
  {
    "label": "Guadeloupe",
    "value": "GP",
    "emoji": "🇬🇵",
    "phoneCode": "590"
  },
  {
    "label": "Bolivia",
    "value": "BO",
    "emoji": "🇧🇴",
    "phoneCode": "591"
  },
  {
    "label": "Guyana",
    "value": "GY",
    "emoji": "🇬🇾",
    "phoneCode": "592"
  },
  {
    "label": "Ecuador",
    "value": "EC",
    "emoji": "🇪🇨",
    "phoneCode": "593"
  },
  {
    "label": "French Guiana",
    "value": "GF",
    "emoji": "🇬🇫",
    "phoneCode": "594"
  },
  {
    "label": "Paraguay",
    "value": "PY",
    "emoji": "🇵🇾",
    "phoneCode": "595"
  },
  {
    "label": "Martinique",
    "value": "MQ",
    "emoji": "🇲🇶",
    "phoneCode": "596"
  },
  {
    "label": "Suriname",
    "value": "SR",
    "emoji": "🇸🇷",
    "phoneCode": "597"
  },
  {
    "label": "Uruguay",
    "value": "UY",
    "emoji": "🇺🇾",
    "phoneCode": "598"
  },
  {
    "label": "Curacao",
    "value": "CW",
    "phoneCode": "599",
    "emoji": "🇨🇼"
  },
  {
    "label": "Malaysia",
    "value": "MY",
    "emoji": "🇲🇾",
    "phoneCode": "60"
  },
  {
    "label": "Australia",
    "value": "AU",
    "emoji": "🇦🇺",
    "phoneCode": "61"
  },
  {
    "label": "Indonesia",
    "value": "ID",
    "emoji": "🇮🇩",
    "phoneCode": "62"
  },
  {
    "label": "Philippines",
    "value": "PH",
    "emoji": "🇵🇭",
    "phoneCode": "63"
  },
  {
    "label": "New Zealand",
    "value": "NZ",
    "emoji": "🇳🇿",
    "phoneCode": "64"
  },
  {
    "label": "Singapore",
    "value": "SG",
    "emoji": "🇸🇬",
    "phoneCode": "65"
  },
  {
    "label": "Thailand",
    "value": "TH",
    "emoji": "🇹🇭",
    "phoneCode": "66"
  },
  {
    "label": "Timor-Leste",
    "value": "TL",
    "emoji": "🇹🇱",
    "phoneCode": "670"
  },
  {
    "label": "Brunei",
    "value": "BN",
    "emoji": "🇧🇳",
    "phoneCode": "673"
  },
  {
    "label": "Papua New Guinea",
    "value": "PG",
    "emoji": "🇵🇬",
    "phoneCode": "675"
  },
  {
    "label": "Tonga",
    "value": "TO",
    "emoji": "🇹🇴",
    "phoneCode": "676"
  },
  {
    "label": "Solomon Islands",
    "value": "SB",
    "emoji": "🇸🇧",
    "phoneCode": "677"
  },
  {
    "label": "Vanuatu",
    "value": "VU",
    "emoji": "🇻🇺",
    "phoneCode": "678"
  },
  {
    "label": "Fiji",
    "value": "FJ",
    "emoji": "🇫🇯",
    "phoneCode": "679"
  },
  {
    "label": "Palau",
    "value": "PW",
    "emoji": "🇵🇼",
    "phoneCode": "680"
  },
  {
    "label": "Cook Islands",
    "value": "CK",
    "emoji": "🇨🇰",
    "phoneCode": "682"
  },
  {
    "label": "Samoa",
    "value": "WS",
    "emoji": "🇼🇸",
    "phoneCode": "685"
  },
  {
    "label": "Kiribati",
    "value": "KI",
    "emoji": "🇰🇮",
    "phoneCode": "686"
  },
  {
    "label": "New Caledonia",
    "value": "NC",
    "emoji": "🇳🇨",
    "phoneCode": "687"
  },
  {
    "label": "French Polynesia",
    "value": "PF",
    "emoji": "🇵🇫",
    "phoneCode": "689"
  },
  {
    "label": "Kazakhstan",
    "value": "KZ",
    "emoji": "🇰🇿",
    "phoneCode": "7"
  },
  {
    "label": "Russia",
    "value": "RU",
    "emoji": "🇷🇺",
    "phoneCode": "7"
  },
  {
    "label": "Japan",
    "value": "JP",
    "emoji": "🇯🇵",
    "phoneCode": "81"
  },
  {
    "label": "South Korea",
    "value": "KR",
    "emoji": "🇰🇷",
    "phoneCode": "82"
  },
  {
    "label": "Vietnam",
    "value": "VN",
    "emoji": "🇻🇳",
    "phoneCode": "84"
  },
  {
    "label": "Hong Kong",
    "value": "HK",
    "emoji": "🇭🇰",
    "phoneCode": "852"
  },
  {
    "label": "Macau",
    "value": "MO",
    "phoneCode": "853",
    "emoji": "🇲🇴"
  },
  {
    "label": "Cambodia",
    "value": "KH",
    "emoji": "🇰🇭",
    "phoneCode": "855"
  },
  {
    "label": "Laos",
    "value": "LA",
    "phoneCode": "856",
    "emoji": "🇱🇦"
  },
  {
    "label": "China",
    "value": "CN",
    "emoji": "🇨🇳",
    "phoneCode": "86"
  },
  {
    "label": "Bangladesh",
    "value": "BD",
    "emoji": "🇧🇩",
    "phoneCode": "880"
  },
  {
    "label": "Taiwan",
    "value": "TW",
    "emoji": "🇨🇳",
    "phoneCode": "886"
  },
  {
    "label": "Turkey",
    "value": "TR",
    "emoji": "🇹🇷",
    "phoneCode": "90"
  },
  {
    "label": "India",
    "value": "IN",
    "emoji": "🇮🇳",
    "phoneCode": "91"
  },
  {
    "label": "Pakistan",
    "value": "PK",
    "emoji": "🇵🇰",
    "phoneCode": "92"
  },
  {
    "label": "Afghanistan",
    "value": "AF",
    "emoji": "🇦🇫",
    "phoneCode": "93"
  },
  {
    "label": "Sri Lanka",
    "value": "LK",
    "emoji": "🇱🇰",
    "phoneCode": "94"
  },
  {
    "label": "Myanmar",
    "value": "MM",
    "emoji": "🇲🇲",
    "phoneCode": "95"
  },
  {
    "label": "Maldives",
    "value": "MV",
    "emoji": "🇲🇻",
    "phoneCode": "960"
  },
  {
    "label": "Lebanon",
    "value": "LB",
    "emoji": "🇱🇧",
    "phoneCode": "961"
  },
  {
    "label": "Jordan",
    "value": "JO",
    "emoji": "🇯🇴",
    "phoneCode": "962"
  },
  {
    "label": "Syria",
    "value": "SY",
    "emoji": "🇸🇾",
    "phoneCode": "963"
  },
  {
    "label": "Iraq",
    "value": "IQ",
    "emoji": "🇮🇶",
    "phoneCode": "964"
  },
  {
    "label": "Kuwait",
    "value": "KW",
    "emoji": "🇰🇼",
    "phoneCode": "965"
  },
  {
    "label": "Saudi Arabia",
    "value": "SA",
    "emoji": "🇸🇦",
    "phoneCode": "966"
  },
  {
    "label": "Yemen",
    "value": "YE",
    "emoji": "🇾🇪",
    "phoneCode": "967"
  },
  {
    "label": "Oman",
    "value": "OM",
    "emoji": "🇴🇲",
    "phoneCode": "968"
  },
  {
    "label": "Palestine",
    "value": "BL",
    "emoji": "🇵🇸",
    "phoneCode": "970"
  },
  {
    "label": "United Arab Emirates",
    "value": "AE",
    "emoji": "🇦🇪",
    "phoneCode": "971"
  },
  {
    "label": "Israel",
    "value": "IL",
    "emoji": "🇮🇱",
    "phoneCode": "972"
  },
  {
    "label": "Bahrain",
    "value": "BH",
    "emoji": "🇧🇭",
    "phoneCode": "973"
  },
  {
    "label": "Qatar",
    "value": "QA",
    "emoji": "🇶🇦",
    "phoneCode": "974"
  },
  {
    "label": "Bhutan",
    "value": "BT",
    "emoji": "🇧🇹",
    "phoneCode": "975"
  },
  {
    "label": "Mongolia",
    "value": "MN",
    "emoji": "🇲🇳",
    "phoneCode": "976"
  },
  {
    "label": "Nepal",
    "value": "NP",
    "emoji": "🇳🇵",
    "phoneCode": "977"
  },
  {
    "label": "Iran",
    "value": "IR",
    "emoji": "🇮🇷",
    "phoneCode": "98"
  },
  {
    "label": "Tajikistan",
    "value": "TJ",
    "emoji": "🇹🇯",
    "phoneCode": "992"
  },
  {
    "label": "Turkmenistan",
    "value": "TM",
    "emoji": "🇹🇲",
    "phoneCode": "993"
  },
  {
    "label": "Azerbaijan",
    "value": "AZ",
    "emoji": "🇦🇿",
    "phoneCode": "994"
  },
  {
    "label": "Georgia",
    "value": "GE",
    "emoji": "🇬🇪",
    "phoneCode": "995"
  },
  {
    "label": "Kyrgyzstan",
    "value": "KG",
    "emoji": "🇰🇬",
    "phoneCode": "996"
  },
  {
    "label": "Uzbekistan",
    "value": "UZ",
    "emoji": "🇺🇿",
    "phoneCode": "998"
  }
];

export default countries;
