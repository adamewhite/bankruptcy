import { getUser, addUser, deleteUser } from '../controllers/usersController';

const usersRoutes = (app) => {
    app.route('/users')

    .get(getUser)

    .post(addUser)

    app.route('/users/:user_id')

    .delete(deleteUser)

}

export default usersRoutes;
