export interface Checkpoint {
  accuracy: number;
  checkpoint_id: number;
  created_at: Date;
}

export interface GetCheckpointsResponseItem {
  model_name: string;
  model_id: number;
  checkpoints: Checkpoint[];
}
