export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
	if (!email.trim()) {
		return {
			isValid: false,
			error: "Email is required",
		};
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) {
		return {
			isValid: false,
			error: "Please enter a valid email address",
		};
	}

	if (email.length > 254) {
		return {
			isValid: false,
			error: "Email address is too long",
		};
	}

	return {
		isValid: true,
	};
};

export const validateRequired = (
	value: string,
	fieldName: string,
): ValidationResult => {
	if (!value.trim()) {
		return {
			isValid: false,
			error: `${fieldName} is required`,
		};
	}

	return {
		isValid: true,
	};
};

export const validateName = (name: string): ValidationResult => {
	if (!name.trim()) {
		return {
			isValid: false,
			error: "Name is required",
		};
	}

	if (name.trim().length < 2) {
		return {
			isValid: false,
			error: "Name must be at least 2 characters",
		};
	}

	if (name.trim().length > 50) {
		return {
			isValid: false,
			error: "Name must be less than 50 characters",
		};
	}

	return {
		isValid: true,
	};
};

export const validatePhoneNumber = (phoneNumber: string): ValidationResult => {
	if (!phoneNumber.trim()) {
		return {
			isValid: false,
			error: "Phone number is required",
		};
	}

	// Remove all non-digit characters for validation
	const digitsOnly = phoneNumber.replace(/\D/g, "");

	// Check if it's empty after removing non-digits
	if (!digitsOnly) {
		return {
			isValid: false,
			error: "Please enter a valid phone number",
		};
	}

	// Check minimum length (most countries have at least 7 digits)
	if (digitsOnly.length < 7) {
		return {
			isValid: false,
			error: "Phone number is too short",
		};
	}

	// Check maximum length (international numbers are typically max 15 digits)
	if (digitsOnly.length > 15) {
		return {
			isValid: false,
			error: "Phone number is too long",
		};
	}

	// For international numbers starting with +, ensure proper format
	if (phoneNumber.startsWith("+")) {
		const withoutPlus = phoneNumber.substring(1).replace(/\D/g, "");
		if (withoutPlus.length < 7 || withoutPlus.length > 15) {
			return {
				isValid: false,
				error: "Please enter a valid international phone number",
			};
		}
	}

	return {
		isValid: true,
	};
};
