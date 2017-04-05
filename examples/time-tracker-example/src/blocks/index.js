import {merge} from 'redux-blocks/lib/saga';
import Navigation from './navigation';
import Authentication from './authentication';
import Projects from './projects';
import Tasks from './tasks';
import Activities from './activities';
import Alerts from './alerts';
import Modal from './modal';
import Entities from './entities';


export default merge(
    Navigation,
    Authentication,
    Projects,
    Tasks,
    Activities,
    Alerts,
    Modal,
    Entities
);
