import FieldConfiguration from "./fieldConfiguration"

export default interface Entity {
    order: number,
    name: string
    path: string
    fieldsConfiguration: Array<FieldConfiguration>
}
