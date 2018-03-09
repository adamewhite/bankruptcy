import mongoose from 'mongoose';
import { TrustsSchema } from '../models/trusts';

const Trust = mongoose.model('Trust', TrustsSchema);

export const getTrusts = (req, res) => {

    Trust.find(function(err, trusts) {
      if (err) {
        res.send(err);
      }

      res.json(trusts)
    });
};

