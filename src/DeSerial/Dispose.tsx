import { prefixClass } from "./classname";

export default Dispose;

interface DisposeProps {
  value: "target" | "extract";
  onChange: (v: string) => void;
}

function Dispose({ value, onChange }: DisposeProps) {
  return (
    <div className={prefixClass("dispose")}>
      <select
        className={prefixClass("dispose-select")}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value="target">赋值</option>
        <option value="extract">加工</option>
      </select>
    </div>
  );
}
