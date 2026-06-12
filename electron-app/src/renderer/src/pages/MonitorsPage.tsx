import { useSearchParams } from "react-router-dom";
import type React from "react";

function MonitorsPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dpr = window.devicePixelRatio;

  return (
    <div
      className="card"
      style = {{
        '--dpr': dpr,
        width: '100vw',
        height: '100vh',
        borderRadius: '0%',
      } as React.CSSProperties}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100% - 18px)',
        } as React.CSSProperties}
      >
        <h1 className="card-title">{id}</h1>
      </div>
    </div>
  )
}

export default MonitorsPage;
