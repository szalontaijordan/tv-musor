// TODO: move node side
const shortid = require('shortid');

export function createNewId() {
    return 'SL-' + shortid.generate();
}
