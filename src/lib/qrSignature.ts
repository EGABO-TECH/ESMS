const QR_SALT = process.env.NEXT_PUBLIC_QR_SIGNING_KEY || "esms-default-signature-key";

const hashPayload = (value: string) => {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
};

export const buildVerificationPayload = (data: {
  name: string;
  id: string;
  course: string;
  campus: string;
  validFrom: string;
  validTo: string;
  avatar: string;
  status: string;
  issuedAt: string;
}) => {
  const payload = `${data.name}|${data.id}|${data.course}|${data.campus}|${data.validFrom}|${data.validTo}|${data.avatar}|${data.status}|${data.issuedAt}`;
  return payload;
};

export const signVerificationPayload = (payload: string) => {
  return hashPayload(`${payload}|${QR_SALT}`);
};

