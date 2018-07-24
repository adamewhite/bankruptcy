import {
    getSites,
    addNewSite,
    updateSite,
    deleteSite
} from '../controllers/sitesController';

const routes = (app) => {
    app.route('/sites')

    .get(getSites)

    .post(addNewSite);

    app.route('/sites/:site_id')

    .put(updateSite)

    .delete(deleteSite);
}

export default sitesRoutes;
