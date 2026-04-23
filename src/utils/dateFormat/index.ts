export type DateFormatToken = "day" | "month" | "year";
export type DateFormatOrder = "DMY" | "MDY" | "YMD";

export type ClientDateFormatConfig = Partial<Record<DateFormatToken, string>>;

interface ClientDateFormatSettings {
  separator?: string;
}

const TOKENS_ORDER_MAP: Record<DateFormatOrder, DateFormatToken[]> = {
  DMY: ["day", "month", "year"],
  MDY: ["month", "day", "year"],
  YMD: ["year", "month", "day"]
};

/**
 * Manages user-facing date format structures and serialization.
 *
 * Allows custom configuration of date format tokens and their order, as well as the separator.
 * Common usage is to create a format (or use the default), then call `toString` to get a string
 * representation suitable for libraries such as `dayjs`.
 *
 * @example
 * const defaultFormat = new ClientDateFormat();
 * defaultFormat.toString(); // "DD-MM-YYYY"
 *
 * const customFormat = new ClientDateFormat({ day: "D", month: "M", year: "YYYY" }, { separator: "." });
 * customFormat.toString(); // "M.D.YYYY"
 */
export class ClientDateFormat {
  public static readonly DEFAULT_CONFIG: ClientDateFormatConfig = {
    day: "DD",
    month: "MM",
    year: "YYYY"
  };

  public static readonly DEFAULT_SETTINGS: ClientDateFormatSettings = {
    separator: "-"
  };

  public static order: DateFormatOrder = "DMY";

  constructor(
    private config: ClientDateFormatConfig = ClientDateFormat.DEFAULT_CONFIG,
    private settings: ClientDateFormatSettings = ClientDateFormat.DEFAULT_SETTINGS
  ) {}

  public toString() {
    return TOKENS_ORDER_MAP[ClientDateFormat.order]
      .map(token => this.config[token])
      .filter(Boolean)
      .join(this.settings.separator);
  }
}
