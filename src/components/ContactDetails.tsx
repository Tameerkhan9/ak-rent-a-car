import {
  BUSINESS_EMAILS,
  CONTACTS,
  whatsappUrl,
} from "@/lib/format";

const defaultMessage =
  "Assalam o Alaikum, I want to book a car from AK Rent A Car & Tourism Company.";

export function ContactDetails({
  id,
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  return (
    <div id={id} className={compact ? "space-y-4" : "space-y-6"}>
      {CONTACTS.map((person) => (
        <div key={person.name}>
          <p
            className={`font-[family-name:var(--font-syne)] font-bold text-white ${
              compact ? "text-base" : "text-lg"
            }`}
          >
            {person.name}
          </p>
          <ul className="mt-2 space-y-2">
            {person.phones.map((phone) => (
              <li key={phone.whatsapp}>
                <a
                  href={whatsappUrl(phone.whatsapp, defaultMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-fog/90 transition hover:text-copper"
                >
                  <span className="text-copper">WhatsApp</span>
                  <span>{phone.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Email</p>
        <ul className="mt-1 space-y-1">
          {BUSINESS_EMAILS.map((email) => (
            <li key={email}>
              <a
                href={`mailto:${email}`}
                className="text-sm text-fog/90 transition hover:text-copper"
              >
                {email}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
