import LeftPanel from "../components/LeftPanel";
import ChatPanel from "../components/ChatPanel";

function Dashboard() {

  return (

    <div>

      <div className="topbar">

        <h1>
          AI-First CRM
        </h1>

        <p>
          HCP Interaction Logger
        </p>

      </div>

      <div className="split-layout">

        <LeftPanel />

        <ChatPanel />

      </div>

    </div>

  );
}

export default Dashboard;