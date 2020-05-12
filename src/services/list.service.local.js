import { ListService } from "./list.service";

const mockList = {
    id: 'mock-id',
    list: [
        { id: 0, label: 'mock item 1'},
        { id: 1, label: 'mock item 2'},
        { id: 2, label: 'mock item 3'},
        { id: 3, label: 'mock item 4'},
        { id: 4, label: 'mock item 5'},
    ],
    title: 'Mock list 1',
    date: new Date()
};

export class ListServiceLocal extends ListService {

    lists = [
        mockList
    ];

    constructor(...props) {
        super(props);
    }

    async fetchLists() {
        await this._delay();
        return this.lists;;
    }

    async fetchList(id) {
        await this._delay();
        return mockList;
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
