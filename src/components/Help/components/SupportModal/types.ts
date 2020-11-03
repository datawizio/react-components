export interface ISupportModal {
  visible: boolean;
  onSubmit: (data: ISupportFormData) => void;
  setVisible: (x: boolean) => void;
  uploadFileURL?: string;
}

export interface ISupportFormData {
  subject: string;
  comment: string;
  uploads?: string[];
}