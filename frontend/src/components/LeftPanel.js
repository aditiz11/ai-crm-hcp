import { useSelector } from "react-redux";

import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaSearch,
  FaPlus
} from "react-icons/fa";

function LeftPanel() {

  const { formData } = useSelector(
    (state) => state.crm
  );

  return (

    <div className="panel-card">

      <div className="section-title">
        Interaction Details
      </div>

      <div className="form-row">

        <div className="form-group half-width">

          <label className="form-label">
            HCP Name
          </label>

          <input
            className="form-input"
            value={formData.hcp_name || ""}
            readOnly
          />

        </div>

        <div className="form-group half-width">

          <label className="form-label">
            Interaction Type
          </label>

          <input
            className="form-input"
            value={formData.interaction_type || ""}
            readOnly
          />

        </div>

      </div>

      <div className="form-row">

        <div className="form-group half-width">

          <label className="form-label">
            Date
          </label>

          <input
            className="form-input"
            value={formData.date || ""}
            readOnly
          />

        </div>

        <div className="form-group half-width">

          <label className="form-label">
            Time
          </label>

          <input
            className="form-input"
            value={formData.time || ""}
            readOnly
          />

        </div>

      </div>

      <div className="form-group">

        <label className="form-label">
          Attendees
        </label>

        <input
          className="form-input"
          value={formData.attendees || ""}
          readOnly
        />

      </div>

      <div className="form-group">

        <label className="form-label">
          Topics Discussed
        </label>

        <textarea
          className="form-input"
          rows="3"
          value={
            formData.topics ||
            formData.discussion ||
            ""
          }
          readOnly
        />

      </div>

      <div className="sub-section">

        <h3 className="sub-section-title">
          Materials Shared
        </h3>

        <div className="input-action-wrapper">

          <input
            className="form-input"
            value={
              formData.materials_shared ||
              (formData.brochure_shared
                ? "Brochure Shared"
                : "")
            }
            readOnly
          />

          <button className="action-button">
            <FaSearch />
            Search
          </button>

        </div>

      </div>

      <div className="sub-section">

        <h3 className="sub-section-title">
          Samples Distributed
        </h3>

        <div className="input-action-wrapper">

          <input
            className="form-input"
            value={
              formData.samples_distributed || ""
            }
            readOnly
          />

          <button className="action-button">
            <FaPlus />
            Add Sample
          </button>

        </div>

      </div>

      <div className="sub-section">

        <h3 className="sub-section-title">
          Observed/Inferred HCP Sentiment
        </h3>

        <div className="sentiment-row">

          <button
            className={`sentiment-chip ${
              formData.sentiment?.toLowerCase() ===
              "positive"
                ? "active-positive"
                : ""
            }`}
          >
            <FaSmile />
            Positive
          </button>

          <button
            className={`sentiment-chip ${
              formData.sentiment?.toLowerCase() ===
              "neutral"
                ? "active-neutral"
                : ""
            }`}
          >
            <FaMeh />
            Neutral
          </button>

          <button
            className={`sentiment-chip ${
              formData.sentiment?.toLowerCase() ===
              "negative"
                ? "active-negative"
                : ""
            }`}
          >
            <FaFrown />
            Negative
          </button>

        </div>

      </div>

      <div className="form-group">

        <label className="form-label">
          AI Generated Summary
        </label>

        <textarea
          className="form-input"
          rows="4"
          value={formData.summary || ""}
          readOnly
        />

      </div>

      <div className="sub-section">

        <h3 className="sub-section-title">
          Suggested Follow-ups
        </h3>

        <div className="followup-container">

          {
            (
              formData.suggested_followups || []
            ).map((item, index) => (

              <button
                key={index}
                className="followup-pill"
              >
                {item}
              </button>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default LeftPanel;