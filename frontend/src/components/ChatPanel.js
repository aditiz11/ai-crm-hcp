import { useState } from "react";

import axios from "axios";

import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  updateForm,
  addRecentInteraction
} from "../redux/crmSlice";

function ChatPanel() {

  const dispatch = useDispatch();

  const {
    recentInteractions,
    formData
  } = useSelector((state) => state.crm);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text: "Hello! I can log and edit HCP interactions using AI.",
      }
    ]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    // STORE CURRENT INPUT
    const currentInput = input;

    // CLEAR INPUT IMMEDIATELY
    setInput("");

    const userMessage = {
      sender: "user",
      text: currentInput
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/agent/chat",
        {
          message: currentInput,
          current_data: formData
        }
      );

      console.log(response.data);

      dispatch(
        updateForm(response.data.data)
      );

      dispatch(
        addRecentInteraction({
          hcp:
            response.data.data.hcp_name ||
            "Unknown HCP",

          sentiment:
            response.data.data.sentiment ||
            "Neutral"
        })
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        botMessage
      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong"
        }
      ]);
    }

    setLoading(false);
  };

  return (

    <div className="panel-card">

      <div className="section-title">
        AI Assistant
      </div>

      <div className="recent-section">

        <div className="recent-title">
            Recent Interactions
        </div>

        {
            recentInteractions.length === 0 ? (

            <div className="empty-recent">
                No interactions logged yet
            </div>

            ) : (

            recentInteractions.map(
                (item, index) => (

                <div
                    key={index}
                    className="recent-card"
                >

                    <div className="recent-card-top">

                    <div className="recent-hcp">
                        {item.hcp}
                    </div>

                    <div
                        className={`recent-sentiment ${
                        item.sentiment?.toLowerCase() === "positive"
                            ? "recent-positive"
                            : item.sentiment?.toLowerCase() === "negative"
                            ? "recent-negative"
                            : "recent-neutral"
                        }`}
                    >
                        {item.sentiment}
                    </div>

                    </div>

                    <div className="recent-product">
                    {item.product || "General Discussion"}
                    </div>

                </div>
                )
            )

            )
        }

        </div>

      <div className="chat-container">

        {
          messages.map((msg, index) => (

            <div
              key={index}
              className="message-row"
            >

              <div
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >

                <div>
                  {msg.text}
                </div>


              </div>

            </div>
          ))
        }

        {
          loading && (

            <div className="typing-indicator">
              AI is analyzing interaction...
            </div>
          )
        }

      </div>

      <div className="chat-input-row">

        <input
          className="chat-input"
          value={input}
          autoComplete="off"
          placeholder='Describe HCP interaction using natural language...'
          onChange={(e) =>
            setInput(e.target.value)
          }

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              sendMessage();
            }
          }}
        />

        <button
          className="send-btn"
          onClick={sendMessage}
        >
          Log
        </button>

      </div>

    </div>
  );
}

export default ChatPanel;