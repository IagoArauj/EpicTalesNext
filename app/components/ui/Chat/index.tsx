"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import ChatLine from "../ChatLine";
import Input from "../Input";
import ChatProps from "./ChatProps";
import { api } from "../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import ChatLineMock from "../Mocks/ChatLineMock";
import { toast } from "react-toastify";
import CustomModal from "../CustomModal";
import Select from "../Select";
import { useDebounceValue, useLocalStorage } from "usehooks-ts";

export default function Chat(props: ChatProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState<string>("");
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [temperature, setTemperature] = useLocalStorage<number>(
    "temperature",
    0.5
  );
  const [temperatureInput, setTemperatureInput] = useState<string>(
    temperature?.toString() || "0.5"
  );
  const [debouncedTemperature, _setDebouncedTemperature] = useDebounceValue(
    parseFloat(temperatureInput),
    1000
  );
  const [model, setModel] = useLocalStorage<string>("model", "llama3-70b-8192");
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props.messages.length === 0) {
      const welcomeMessage = async () => {
        setIsLoading(true);
        try {
          const response = await api.post("/aimodule/generate-response/", {
            user_input:
              'Hi!',
            temperature: temperature,
            model_name: model,
          });

          props.setMessages(() => [
            {
              isSquire: true,
              text: response.data.response,
              timestamp: response.data.timestamp,
            },
          ]);
        } catch (error) {
          console.error(error);
          toast.error("An error occurred with Squire, try again later.", {
            toastId: "squire-error",
          });
          setError(true);
        }

        setIsLoading(false);
      };

      welcomeMessage();
    }
  }, [model, temperature, props.messages, props.setMessages]);

  useEffect(() => {
    if (debouncedTemperature != null && debouncedTemperature !== temperature) {
      setTemperature(debouncedTemperature);
      toast.info(`Model's temperature set to ${debouncedTemperature}`);
    }
  }, [debouncedTemperature, setTemperature, temperature]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (input === "" || isLoading || error) {
      return;
    }

    setIsLoading(true);

    props.setMessages((messages) => [
      ...messages,
      {
        isSquire: false,
        text: input,
        timestamp: new Date().toISOString(),
      },
    ]);

    setInput("");
    try {
      const response = await api.post("/aimodule/generate-response/", {
        user_input: input,
        temperature: temperature,
        model_name: model,
      });

      props.setMessages((messages) => [
        ...messages,
        {
          isSquire: true,
          text: response.data.response,
          timestamp: response.data.timestamp,
        },
      ]);
    } catch (error) {
      console.error(error);

      toast.error("An error occurred with Squire, try again later.", {
        toastId: "squire-error",
      });
      setError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const ref = messagesRef.current;
    if (ref) {
      ref.scrollTop = ref.scrollHeight;
    }
  }, [props.messages]);

  return (
    <div
      className={`h-full flex flex-col max-h-[90vh]`}
      style={props.maxHeight ? { height: props.maxHeight } : {}}
    >
      <div
        ref={messagesRef}
        className="h-fill mb-2 overflow-y-auto flex flex-col gap-3 scroll-smooth"
      >
        {props.messages.map((message, index) => (
          <ChatLine key={index} message={message} />
        ))}
        {isLoading && <ChatLineMock />}
        {error && (
          <ChatLine
            message={{
              text: "Alas, brave adventurer, my armor is currently down for repairs. Please try again later, and may your quest continue without delay!",
              isSquire: true,
              timestamp: new Date().toISOString(),
            }}
          />
        )}
      </div>

      <div className="flex w-fill mt-auto">
        <Button
          type="button"
          color="primary"
          className="rounded-r-none flex-none"
          disabled={isLoading || error}
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faCogs} />
        </Button>
        <Input
          type="text"
          className="rounded-none disabled:bg-gray-200 disabled:cursor-not-allowed"
          containerClassName="flex-1"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={error}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e);
            }
          }}
        />
        <Button
          type="button"
          color="primary"
          className="rounded-l-none flex-none"
          disabled={isLoading || error}
        >
          Send
        </Button>
      </div>

      <CustomModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        title="Squire Settings"
      >
        <div className="flex items-end space-x-4">
          <Input
            type="number"
            label="Temperature"
            value={temperatureInput}
            onChange={(e) => {
              const t = parseFloat(e.target.value);
              if (t < 0 || t > 1) {
                return;
              }
              setTemperatureInput(e.target.value);
            }}
            min={0}
            max={1}
            step={0.1}
            containerClassName="w-1/2"
          />
          <Select
            options={[
              { label: "Meta Llama 3 70B (Default, Recommended)", value: "llama3-70b-8192" },
              { label: "Gemma 2 9B (Recommended)", value: "gemma2-9b-it" },
              { label: "Gemma 7B", value: "gemma-7b-it" },
              {
                label: "Llama 3.1 8B (Preview)",
                value: "llama-3.1-8b-instant",
              },
              { label: "Meta Llama 3 8B", value: "llama3-8b-8192" },
              { label: "Mixtral 8x7B", value: "mixtral-8x7b-32768" },
            ]}
            label="LLM Model"
            value={model}
            onChange={(e) => {
              toast.info(`Model set to ${e.target.value}`);
              setModel(e.target.value);
            }}
            containerClassName="w-1/2"
          />
        </div>
      </CustomModal>
    </div>
  );
}
