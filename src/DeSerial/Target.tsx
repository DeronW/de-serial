import { prefixClass } from "./classname";

export default Target;

function Target({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={prefixClass("target")}>
      <input
        className={prefixClass("target-input")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="结果字段名"
      />
    </div>
  );
}
