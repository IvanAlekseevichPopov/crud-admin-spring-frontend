import ListFieldConfiguration from "./listFieldConfiguration"
import EditFieldConfiguration from "./editFieldConfiguration"

export default interface Entity {
    order: number,
    name: string
    path: string
    listFieldsConfiguration: Array<ListFieldConfiguration>
    editFieldsConfiguration?: Array<EditFieldConfiguration>
}
