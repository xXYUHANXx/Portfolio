"use client";

import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/domain/contact/use-cases/sendContactEmail";
import { contactFormSchema } from "@/domain/contact/entities/ContactForm";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "WHATSAPP",
    url: "https://wa.me/+584164973499",
    iconSrc: "https://i.ibb.co/S4RnfhcK/WHATSAPP.png",
    hint: "whatsapp logo",
  },
  {
    name: "INSTAGRAM",
    url: "https://www.instagram.com/createdforkillyou/",
    iconSrc: "https://i.ibb.co/JFzddXzg/Instragram.png",
    hint: "instagram logo",
  },
  {
    name: "LINKEDIN",
    url: "https://www.linkedin.com/in/yuhanpicos2308/",
    iconSrc: "https://i.ibb.co/KcmbzbMQ/Linkedin.png",
    hint: "linkedin logo",
  },
  {
    name: "GITHUB",
    url: "https://github.com/xXYUHANXx",
    iconSrc: "https://i.ibb.co/Wv050888/Github.png",
    hint: "github logo",
  },
];

export function Social({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const result = await sendEmail(values);

    if (result?.success) {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result?.error || "There was a problem with your request.",
      });
    }
  }

  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full">
      <WindowHeader title={title} onClose={onClose} />
      <ScrollArea className="flex-grow">
        <div className="p-2 flex flex-col gap-2">
          <div className="flex justify-center items-start gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-center group transition-transform duration-200 ease-in-out hover:scale-110"
              >
                <div
                  className="p-2 rounded-2xl bg-white group-hover:bg-black transition-colors"
                  data-ai-hint={link.hint}
                >
                  <Image
                    src={link.iconSrc}
                    alt={`${link.name} icon`}
                    width={48}
                    height={48}
                    className="group-hover:invert"
                  />
                </div>
                <span className="font-display text-xs tracking-wider group-hover:bg-black group-hover:text-white px-1">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <div className="border-t-2 border-dashed border-black my-4"></div>

          <div className="w-full max-w-md mx-auto">
            <h2 className="text-center font-display text-xl mb-4">
              CONTACT ME
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel className={cn(error && "text-destructive")}>
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className={cn(
                            "border-black",
                            error &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel className={cn(error && "text-destructive")}>
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          {...field}
                          className={cn(
                            "border-black",
                            error &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem>
                      <FormLabel className={cn(error && "text-destructive")}>
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          {...field}
                          className={cn(
                            "border-black",
                            error &&
                              "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white border-2 border-black rounded-lg px-6 py-2 hover:bg-gray-100 active:bg-gray-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all text-black hover:text-black"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
