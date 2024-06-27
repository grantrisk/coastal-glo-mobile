import { z } from "zod";

export const addressSchema = z.object({
  street1: z.string(),
  street2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export const personSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: addressSchema,
});

export const subscriptionSchema = z.object({
  isActive: z.boolean(),
  type: z.string(),
  remainingSprays: z.number(),
  nextBillingDate: z.date(),
});

export const userSchema = personSchema.extend({
  id: z.string(),
  subscription: subscriptionSchema.optional(),
});

export const serviceSchema = z.object({
  serviceId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(), // duration in minutes
});

export const appointmentSchema = z.object({
  appointmentId: z.string(),
  userId: z.string().nullable(),
  guestInfo: personSchema.optional(),
  service: serviceSchema,
  appointmentDate: z.date(),
  status: z.enum(["scheduled", "completed", "canceled"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export const workingHoursSchema = z.object({
  sunday: z.string(),
  monday: z.string(),
  tuesday: z.string(),
  wednesday: z.string(),
  thursday: z.string(),
  friday: z.string(),
  saturday: z.string(),
});

export const notificationSchema = z.object({
  userId: z.string().nullable(),
  appointmentId: z.string(),
  email: z.string().email(),
  type: z.enum(["reminder", "confirmation"]),
  sentAt: z.date(),
  status: z.enum(["sent", "failed"]),
});