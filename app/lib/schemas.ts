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
  notes: z.string().nullable(),
  lastSprayDate: z.date().nullable(),
  lastSolutionUsed: z.string().nullable(),
  subscription: subscriptionSchema.nullable(),
});

export const serviceSchema = z.object({
  serviceId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().nullable(),
  duration: z.number().nullable(), // duration in minutes
  listOrder: z.number(),
  recommended: z.boolean(),
  isMonthly: z.boolean(),
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
  price: z.number().nullable(),
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

export const specialClosureSchema = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export const notificationSchema = z.object({
  userId: z.string().nullable(),
  appointmentId: z.string(),
  email: z.string().email(),
  type: z.enum(["reminder", "confirmation"]),
  sentAt: z.date(),
  status: z.enum(["sent", "failed"]),
});

export type User = z.infer<typeof userSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Appointment = z.infer<typeof appointmentSchema>;
export type Product = z.infer<typeof productSchema>;
export type WorkingHours = z.infer<typeof workingHoursSchema>;
export type SpecialClosure = z.infer<typeof specialClosureSchema>;
export type Notification = z.infer<typeof notificationSchema>;
