import { useState } from "react";
import DeSerial from "./DeSerial";

function App() {
  const [s, setS] = useState("");

  // let v: DeSerialExtract = {
  //   kind: "extract_target",
  //   action: "trim",
  //   params: ["0", "10"],
  //   return: DeSerialType.String,
  //   target: "ha",
  // };

  const handler = (v: any) => {
    setS(JSON.stringify(v, null, 2));
  };

  return (
    <div className="App">
      <div>
        <textarea
          style={{
            width: "100%",
            minHeight: "100px",
          }}
          defaultValue={`
{
	"name": "john",
	"age":47,
	"other":{
		"gender": "male", 
		"colors": ["black", 7]
	}
}
`}
        ></textarea>
      </div>
      <DeSerial onChange={handler} />
      <br />
      <br />
      <pre>{s}</pre>
    </div>
  );
}

export default App;
