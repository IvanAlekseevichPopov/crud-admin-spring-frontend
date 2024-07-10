import Entity from "./entity"

export default interface AppConfig {
    test?: string,
    test2?: string,
    entities: Array<Entity>
}
