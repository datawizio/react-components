export interface PollingProps {
  questions: PollingQuestion[];
  onSubmit: (payload: PollingPayload) => any;
}

export interface PollingQuestion {
  question_key: string;
  polling_template: number;
  feedback_type: string;
}

export interface PollingStep extends PollingQuestion {
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
