import { useState } from "react";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { SelectBudgetOptions, SelectTravelsList } from "./options";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as plannerApi from "../../api/planner.api";
import { TripPlanDetails } from "./TripPlanDetails";
import "./TripPlans.css";
import "./TravelPlan.css";

const POLL_INTERVAL_MS = 2500;
const MAX_POLL_ATTEMPTS = 40; // ~100s ceiling before giving up

/** Polls GET /planner/jobs/:jobId until the queued generation job completes or fails. */
const pollJob = (jobId) =>
  new Promise((resolve, reject) => {
    let attempts = 0;

    const tick = async () => {
      attempts += 1;
      try {
        const response = await plannerApi.getJobStatus(jobId);
        const { status, result, error } = response.data.data;

        if (status === "completed") {
          resolve(result);
        } else if (status === "failed") {
          reject(new Error(error || "Trip generation failed"));
        } else if (attempts >= MAX_POLL_ATTEMPTS) {
          reject(new Error("Trip generation is taking too long. Please try again."));
        } else {
          setTimeout(tick, POLL_INTERVAL_MS);
        }
      } catch (err) {
        reject(err);
      }
    };

    tick();
  });

export const TravelPlan = () => {
  const [formData, setFormData] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const OnGenerateTrip = async () => {
    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
      toast.error("Please fill all details");
      return;
    }

    if (formData?.noOfDays > 7) {
      toast.warning("Consider shorter trips for better suggestions!");
    }

    const travelerOption = SelectTravelsList.find((item) => item.people === formData.traveler);
    const travelerLabel = travelerOption ? travelerOption.title : String(formData.traveler);

    setGenerating(true);

    try {
      const response = await plannerApi.generateTripPlan({
        location: formData.location.label,
        totalDays: formData.noOfDays,
        traveler: travelerLabel,
        budget: formData.budget,
      });

      const plan = await pollJob(response.data.data.jobId);
      setGeneratedPlan(plan);
      toast.success("Travel plan generated and saved!");
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast.error("Failed to generate travel plan. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="travel-plan-container">
      <ToastContainer />

      <div className="travel-hero">
        <img src="/photos/travel-journal.jpeg" alt="" className="travel-hero__bg" />
        <div className="travel-hero__scrim" />
        <div className="travel-hero__content">
          <span className="travel-hero__eyebrow">Plan Your Trip</span>
          <h1>Travel Plan</h1>
          <p className="travel-subtitle">
            Provide some basic information to generate your travel plan
          </p>
        </div>
      </div>

      <div className="travel-plan-card">
        <div className="form-section">
          <div className="section-title">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            What is your Destination?
          </div>
          <div className="place-autocomplete-wrap">
            <PlaceAutocomplete
              placeholder="Search for a destination..."
              onChange={(v) => handleInputChange("location", v)}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
            How many days are you planning your trip?
          </div>
          <input
            type="number"
            className="number-input"
            placeholder="Enter number of days"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div className="form-section">
          <div className="section-title">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
            What is your budget?
          </div>
          <div className="budget-grid">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`budget-card ${formData.budget === item.title ? "selected" : ""}`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <span className="budget-icon">{item.icon}</span>
                <div className="budget-title">{item.title}</div>
                <div className="budget-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="section-title">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.27c-.41.55-.63 1.24-.59 1.93V22h-6v-2h4v-4h-2.5l-2.54-7.63A1.5 1.5 0 0 0 4.54 8H3c-.8 0-1.54.37-2.01 1L0 15v7h2v-6h2.5l2.04 6.13c.41 1.02 1.37 1.87 2.46 1.87H9c.8 0 1.54-.37 2.01-1l4.7-6.27c.41-.55.63-1.24.59-1.93V6h6v2h-4v4h2.5l2.04 6.13c.41 1.02 1.37 1.87 2.46 1.87H22v-2h-2z" />
            </svg>
            Who do you plan to travel with on your next adventure?
          </div>
          <div className="traveler-grid">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`traveler-chip ${formData.traveler === item.people ? "selected" : ""}`}
                onClick={() => handleInputChange("traveler", item.people)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <button className="generate-button" onClick={OnGenerateTrip} disabled={generating}>
          {generating ? "Generating your trip..." : "Generate Trip"}
        </button>
      </div>

      {generatedPlan && (
        <div className="generated-trip-card">
          <div className="generated-trip-card__header">
            <span className="generated-trip-card__badge">Just Generated</span>
            <div className="modal-title">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {generatedPlan.location}
            </div>
          </div>
          <div className="modal-body">
            <TripPlanDetails plan={generatedPlan} />
          </div>
        </div>
      )}
    </div>
  );
};
