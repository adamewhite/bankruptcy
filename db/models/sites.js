import { Schema } from 'mongoose';

export const SitesSchema = new Schema({
  trust_id: Schema.ObjectId,
  name: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  start_date: {type: Date, default: '1/1/1900'},
  end_date: {type: Date, default: '12/31/2017'},
  site_code: {type: String},
  category: String,
  direction: String,
  narrowedTrustId: Schema.ObjectId
});
