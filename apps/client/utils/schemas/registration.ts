import type { RegistrationState } from "@/stores/use-registry-store";
import { z } from "zod";

const phoneSchema = z
	.string()
	.min(1, "Phone number is required")
	.regex(/^\+?[\d\s-()]+$/, "Invalid phone number");
const isPhoneNumberValidSchema = z.literal(true);
const emailSchema = z
	.string()
	.min(1, "Email is required")
	.email("Invalid email address");
const usernameSchema = z
	.string()
	.min(1, "Required")
	.min(4, "At least 2 characters");

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
];

export const validateStep = (step: number, data: RegistrationState) => {
	const schema = stepSchemas[step];
	if (!schema)
		return { isValid: false, errors: ["Invalid step"], fieldErrors: {} };

	const result = schema.safeParse(data);

	if (result.success) {
		return { isValid: true, errors: [], fieldErrors: {} };
	}

	const fieldErrors: Record<string, string[]> = {};
	const errors = result.error.errors.map((err) => {
		const field = err.path.join(".");
		if (!fieldErrors[field]) fieldErrors[field] = [];
		fieldErrors[field].push(err.message);
		return err.message;
	});

	return { isValid: false, errors, fieldErrors };
};

export const validateField = (
	step: number,
	field: keyof RegistrationState,
	value: string,
	data: RegistrationState,
): string[] => {
	const schema = stepSchemas[step];
	if (!schema) return [];

	const testData = { ...data, [field]: value };
	const result = schema.safeParse(testData);

	return result.success
		? []
		: result.error.errors
				.filter((err) => err.path.includes(field))
				.map((err) => err.message);
};

export const canAccessStep = (
	targetStep: number,
	data: RegistrationState,
): boolean => {
	if (targetStep === 0) return true;

	for (let i = 0; i < targetStep; i++) {
		if (!validateStep(i, data).isValid) return false;
	}
	return true;
};
