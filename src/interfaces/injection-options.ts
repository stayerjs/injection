export default interface InjectionOptions {
  factory: () => Promise<object>,
}
