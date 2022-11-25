import { TableComponents, _set_components, VtOpts, init } from "./vt";

const _browser = 1;
const _node = 2;

(function () {
  const env =
    typeof window === "object" && window instanceof Window ? _browser : _node;
  if (env & _browser) {
    if (
      !Object.hasOwnProperty.call(window, "requestAnimationFrame") &&
      !window.requestAnimationFrame
    )
      throw new Error(
        "Please using the modern browsers or appropriate polyfill!"
      );
  }
})();

/**
 * @example
 *
 * function MyTableComponent() {
 *
 * // ... your code
 *
 *
 * const y = 600;
 * const [ vt, setComponents, vtRef ] = useVT(() => ({
 *  scroll: {
 *    y
 *  }
 * }),
 * [y]);
 *
 * // useEffect(() => {
 * //  setComponents({
 * //    body: {
 * //      cell: MyCell,
 * //    }
 * //  })
 * // });
 *
 * // useEffect(() => vtRef.current.toScroll(100), []);
 *
 * return (
 *  <Table
 *   columns={columns}
 *   dataSource={dataSource}
 *   scroll={{ x: 1000, y }}
 *   components={vt}
 *  />
 * );
 * }
 */
function useVT(
  fnOpts: () => VtOpts,
  deps: React.DependencyList
): [TableComponents, (components: TableComponents) => void, VtOpts["ref"]] {
  const ctx = init(fnOpts, deps || []);

  return [
    ctx._vtcomponents,
    (components: TableComponents) => _set_components(ctx, components),
    ctx.ref
  ];
}

export { useVT };
