import type { RegistrationState } from "@/stores/use-registry-store";
import { z } from "zod";

const phoneSchema = z
	.string()
	.trim()
	.min(1, { error: "Phone number is required" })
	.regex(/^(?=.*\d)\+?[0-9\s\-()]+$/, { error: "Invalid phone number" });

const isPhoneNumberValidSchema = z.literal(true);

// v4: on compose trim/lowercase AVANT la validation email
const emailSchema = z.string().trim().toLowerCase().pipe(z.email({}));

const usernameSchema = z
	.string()
	.trim()
	.min(1, { error: "Required" })
	.min(4, { error: "At least 4 characters" });

export const stepSchemas = [
	z.object({ phoneNumber: phoneSchema }),
	z.object({
		phoneNumber: phoneSchema,
		isPhoneConfirmed: isPhoneNumberValidSchema,
	}),
	z.object({ phoneNumber: phoneSchema, email: emailSchema }),
	z.object({ phoneNumber: phoneSchema, email: emailSchema }),
	z.object({
		phoneNumber: phoneSchema,
		email: emailSchema,
		username: usernameSchema,
	}),
] as const;

export const validateStep = (step: number, data: RegistrationState) => {
	const schema = stepSchemas[step];
	if (!schema)
		return { isValid: false, errors: ["Invalid step"], fieldErrors: {} };

	const result = schema.safeParse(data);
	if (result.success) return { isValid: true, errors: [], fieldErrors: {} };

	const fieldErrors: Record<string, string[]> = {};
	const errors = result.error.issues.map((issue) => {
		const field = issue.path.join(".");
		if (!fieldErrors[field]) fieldErrors[field] = [];
		fieldErrors[field].push(issue.message);
		return issue.message;
	});

	return { isValid: false, errors, fieldErrors };
};
