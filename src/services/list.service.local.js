import { ListService } from "./list.service";

export class ListServiceLocal extends ListService {

    lists = [];

    constructor(...props) {
        super(props);
    }

    async fetchLists() {
        await this._delay();
        return this.lists;;
    }

    async fetchList(id) {
        await this._delay();
        return this.lists.find(x => x.id === id);
    }

    async createList(list) {
        console.log('[SERVICE] Create', list);
        await this._delay();
        this.lists.push(list);
        return list;
    }

    async deleteList(list) {
        await this._delay();
        return this.lists.filter(x => x.id !== list.id);
    }

    _delay() {
        return new Promise(resolve => setTimeout(resolve, 400));
    }
}
