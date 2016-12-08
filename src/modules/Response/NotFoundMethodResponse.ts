import Response from './Response';
import ResponseInterface from './ResponseInterface';
import Request from './../Request';
export default class NotFoundMethodResponse extends Response implements ResponseInterface {

    create() {
        
        this.object = {
            status: '404',
            message: 'Method not supported, see protocol: https://idh14.github.io/protocol/'
        };
    }

}