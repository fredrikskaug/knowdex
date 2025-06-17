import type { AgentLoop } from "../../utils/agent/agent-loop.js";

import { Box, Text } from "ink";
import path from "node:path";
import React from "react";

export interface TerminalHeaderProps {
  terminalRows: number;
  version: string;
  PWD: string;
  model: string;
  provider?: string;
  approvalPolicy: string;
  colorsByPolicy: Record<string, string | undefined>;
  agent?: AgentLoop;
  initialImagePaths?: Array<string>;
  flexModeEnabled?: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  terminalRows,
  version,
  PWD,
  model,
  provider = "azure",
  approvalPolicy,
  colorsByPolicy,
  agent,
  initialImagePaths,
  flexModeEnabled = false,
}) => {
  return (
    <>
        {terminalRows < 10 ? (
        // Compact header for small terminal windows
        <Text>
          ● Knowdex v{version} - {PWD} - {model} ({provider}) -{" "}
          <Text color={colorsByPolicy[approvalPolicy]}>{approvalPolicy}</Text>
          {flexModeEnabled ? " - flex-mode" : ""}
        </Text>
      ) : (

        <>
          <Box borderStyle="round" paddingX={1} width={64}>
            <Text>
                {`
         _   __                                  
        | | / /                     ___          
        | |/ / _ __   _____      __/   \\_____  __
        |    \\| '_ \\ / _ \\ \\ /\\ / / /\\ / _ \\ \\/ /
        | |\\  \\ | | | (_) \\ V  V / /_//  __/>  < 
        \\_| \\_/_| |_|\\___/ \\_/\\_/____/\\___/ _/\\_\\                                      
        `}                                      
            </Text>
          </Box>
          <Box
            borderStyle="round"
            borderColor="gray"
            paddingX={1}
            width={64}
            flexDirection="column"
          >
            <Text dimColor> workdir: <Text bold>{PWD}</Text>
            </Text>
            {/*<Text dimColor>
              <Text color="blueBright">↳</Text> model: <Text bold>{model}</Text>
            </Text>
            <Text dimColor>
              <Text color="blueBright">↳</Text> provider:{" "}
              <Text bold>{provider}</Text>
            </Text>
            */}
            <Text dimColor> approval:{" "}
              <Text bold color={colorsByPolicy[approvalPolicy]}>
                {approvalPolicy}
              </Text>
            </Text>
            {flexModeEnabled && (
              <Text dimColor>
                <Text color="blueBright">↳</Text> flex-mode:{" "}
                <Text bold>enabled</Text>
              </Text>
            )}
            {initialImagePaths?.map((img, idx) => (
              <Text key={img ?? idx} color="gray">
                <Text color="blueBright">↳</Text> image:{" "}
                <Text bold>{path.basename(img)}</Text>
              </Text>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default TerminalHeader;
