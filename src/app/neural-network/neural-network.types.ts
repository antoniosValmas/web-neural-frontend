export interface Checkpoint {
  checkpoint_id: number;
  created_at: Date;
}

export interface GetCheckpointsResponseItem {
  model_name: string;
  model_id: number;
  checkpoints: Checkpoint[];
}

export interface GetStatisticsResponse {
  training_loss: number[];
  training_acc: number[];
  evaluation_loss: number;
  evaluation_acc: number;
}
