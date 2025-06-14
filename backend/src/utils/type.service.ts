import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeService {
    getTableName(value: string): { table_name: string } {
        let data: any;

        switch (true) {
            case value.startsWith('INC'):
                data = {
                    url: `incident?sysparm_query=number=${value}&sysparm_exclude_reference_link=true&sysparm_display_value=true`,
                    table_name: 'incident',
                    type: true,
                };
                break;
            case value.startsWith('RITM'):
                data = {
                    url: `sc_task?request_item=${value}&sysparm_exclude_reference_link=true&sysparm_display_value=true`,
                    type: true,
                    table_name: 'sc_req_item',
                    url2: `sc_req_item?request=`,
                    ritm: true,
                };
                break;
            case value.startsWith('RS'):
                data = {
                    type: false,
                };
                break;
            case value.startsWith('IN'):
                data = {
                    type: false,
                };
                break;
            default:
                data = {
                    url: '',
                    table_name: '',
                };
                break;
        }

        return data;
    }
}
