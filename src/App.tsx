import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Card, StyledBody } from "baseui/card";
import { Button, KIND, SHAPE } from "baseui/button";
import { Input } from "baseui/input";
import { useStyletron } from "baseui";
import { Accordion, Panel } from "baseui/accordion";
import { Block } from "baseui/block";
import { FormControl } from "baseui/form-control";
import { Checkbox } from "baseui/checkbox";
import { Slider } from "baseui/slider";

function App() {
  const [useCss, theme] = useStyletron();
  const [uppercase, setUppercase] = useState(false);
  const [length, setLength] = useState(32);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  const generatePassword = () => {
    const passwordLength = length;

    let stringSet = "abcdefghijklmnopqrstuvwxyz";

    if (uppercase) stringSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) stringSet += "0123456789";
    if (symbols) stringSet += `!"#$%&:;<=>?@'({|}~)*+,-[\\]^_./`;

    let tempPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * stringSet.length);
      tempPassword += stringSet[charIndex];
    }
    setPassword(tempPassword);
    setCopied(false);

    // console.log(tempPassword);
  };

  const setNewPassword = () => {
    generatePassword();
  };

  useEffect(() => {
    generatePassword();
  }, [uppercase, length, symbols, numbers]);

  return (
    <Block className="App">
      <Card
        overrides={{
          Root: {
            style: {
              left: "50%",
              maxWidth: "420px",
              position: "absolute",
              top: "20px",
              transform: "translate(-50%, 0)",
              width: "95vw",
            },
          },
        }}
      >
        <StyledBody>
          <Input
            ref={passwordRef}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            overrides={{
              InputContainer: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.accent50,
                }),
              },
              After: () => (
                <Button
                  kind={KIND.tertiary}
                  shape={SHAPE.square}
                  onClick={() => setNewPassword()}
                >
                  <svg
                    className={useCss({
                      height: theme.sizing.scale800,
                      width: theme.sizing.scale800,
                    })}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#aaaaaa"
                      d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
                    />
                  </svg>
                </Button>
              ),
            }}
          />
        </StyledBody>
        <Block>
          <Button
            onClick={() => copyToClipboard()}
            overrides={{
              BaseButton: {
                style: () => ({
                  width: "100%",
                }),
              },
            }}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </Block>
        <Accordion>
          <Panel title="options">
            <Block marginBottom="scale800">
              <FormControl label="length">
                <Slider
                  min={4}
                  max={64}
                  value={[length]}
                  onChange={({ value }) => setLength(value[0])}
                />
              </FormControl>
            </Block>
            <Block>
              <FormControl label="Characters">
                <Block>
                  <Checkbox
                    checked={uppercase}
                    onChange={() => setUppercase(!uppercase)}
                  >
                    A-Z
                  </Checkbox>

                  <Checkbox
                    checked={numbers}
                    onChange={() => setNumbers(!numbers)}
                  >
                    0-9
                  </Checkbox>
                  <Checkbox
                    checked={symbols}
                    onChange={() => setSymbols(!symbols)}
                  >
                    %@#
                  </Checkbox>
                </Block>
              </FormControl>
            </Block>
          </Panel>
        </Accordion>
      </Card>
    </Block>
  );
}

export default App;
