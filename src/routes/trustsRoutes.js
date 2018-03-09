import { getTrusts } from '../controllers/trustsController';

const trustsRoutes = (app) => {
    app.route('/trusts')

    .get(getTrusts)

}

export default trustsRoutes;
