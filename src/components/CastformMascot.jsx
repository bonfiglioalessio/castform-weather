import { useState, useMemo } from "react";
import { getCastformForm } from "../helpers/castformUtils";

const CastformMascot = ({
  condition = "",
  icon = "",
  temp = null,
  onToggleDialogue,
  isDialogueOpen = false,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const form = useMemo(
    () => getCastformForm(condition, icon, temp),
    [condition, icon, temp]
  );

  const handleClick = () => {
    setIsBouncing(true);
    if (onToggleDialogue) {
      onToggleDialogue(form);
    }
    setTimeout(() => setIsBouncing(false), 600);
  };

  return (
    <div
      className={`castform_mascot_wrapper ${isBouncing ? "bounce_pop" : ""} ${
        isDialogueOpen ? "active_chat" : ""
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Click Castform to chat!"
    >
      <div className="castform_aura" style={{ "--aura-color": form.auraColor }} />

      <div className="castform_sprite_container">
        <img
          src={form.artwork}
          alt={`Castform ${form.name}`}
          className="castform_image"
          loading="eager"
        />
      </div>

      <div className="castform_meta_pill">
        <span
          className="castform_type_tag"
          style={{
            color: form.typeColor,
            background: form.typeBg,
            borderColor: `${form.typeColor}55`,
          }}
        >
          {form.type}
        </span>
        <span className="castform_form_name">{form.name}</span>
      </div>
    </div>
  );
};

export default CastformMascot;
