export interface PollingProps {
  questions: PollingQuestion[];
  onSubmit: (payload: PollingPayload) => any;
}

export interface PollingQuestion {
  question_key: string;
  polling_template: number;
  feedback_type: string;
  frequency_in_days?: number;
  first_request_after_days?: number;
}

export interface PollingStep {
  question_key: string;
  polling_template: number;
  feedback_type: string;
  active: boolean;
  id: string;
  mark?: number | null;
  comment?: string;
}

export interface PollingPayload {
  polling_template: number;
  polled: boolean;
  mark?: number | null;
  comment?: string;
}
