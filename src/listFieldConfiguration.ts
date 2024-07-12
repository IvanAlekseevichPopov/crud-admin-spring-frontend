export default interface ListFieldConfiguration {
    field: string,
    headerName?: string
    type: string //TODO enum?
    minWidth?: number //TODO const of default width
    flex?: number
}
