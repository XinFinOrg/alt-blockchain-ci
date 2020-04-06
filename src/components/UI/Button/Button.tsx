import React from "react";
import styled from "@emotion/styled";
import { rgba, lighten, darken } from "polished";
import { mixin, vars } from "../../../styles";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
  htmlFor: string;
}

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
};

interface BaseStyleButtonProps {
  bgColor: string;
  textColor: string;
}

const baseStyleButton = ({ bgColor, textColor }: BaseStyleButtonProps) => {
  return `
    ${mixin.fontSourcesansproBold()}
    ${mixin.fontSize(18)};
    transition: background-color 0.3s ${vars.easeOutCubic}, color 0.3s ${vars.easeOutCubic}, box-shadow 0.3s ${
    vars.easeOutCubic
  };
    display: inline-block;
    vertical-align: middle;
    outline: none;
    border: 0;
    padding: 6px 12px;
    letter-spacing: 0.01rem;
    min-height: 40px;
    cursor: pointer;
    border-radius: ${vars.buttonRadius};
    box-shadow: 0 2px 8px ${rgba(vars.black, 0.15)};
    background-color: ${bgColor};
    color: ${textColor};

    &:hover {
      background-color: ${darken(0.2, bgColor)};
    }

    &[disabled] {
      pointer-events: none;
      box-shadow: none;
      background-color: ${lighten(0.25, bgColor)};
      color: ${lighten(0.25, textColor)};
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
    }

    svg {
      display: block;
      width: 100%;
    }
  `;
};

interface BgWhiteModifierProps {
  hoverColor: string;
}

const bgWhiteModifier = ({ hoverColor }: BgWhiteModifierProps) => {
  return `
    &[disabled] {
      background-color: ${darken(0.05, vars.white)};
    }

    &:hover {
      background-color: ${rgba(hoverColor, 0.15)};
    }
  `;
};

const bgWhiteTextSecondary = `
  ${baseStyleButton({
    bgColor: vars.white,
    textColor: vars.brandBlue,
  })}

  ${bgWhiteModifier({
    hoverColor: vars.brandBlue,
  })}
`;

export const ButtonSolid = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.grey,
    textColor: vars.white,
  })}
`;

export const ButtonSolidOrange = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.brandOrange,
    textColor: vars.white,
  })}
`;

export const ButtonBorderedBlue = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.white,
    textColor: vars.brandNavy,
  })}

  ${mixin.fontSourcesansproRegular()}
  border: solid 1px ${vars.brandNavy};

  &:hover {
    background-color: ${vars.brandNavy};
    color: ${vars.white};
  }
`;

export const ButtonSolidWhiteOrange = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.white,
    textColor: vars.brandOrange,
  })}

  ${bgWhiteModifier({
    hoverColor: vars.brandOrange,
  })}
`;

export const ButtonSolidWhiteBlue = styled(Button)`
  ${bgWhiteTextSecondary}
`;

export const ButtonIconWhiteOrange = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.white,
    textColor: vars.brandOrange,
  })}

  ${bgWhiteModifier({
    hoverColor: vars.brandOrange,
  })}

  svg {
    max-width: 16px;
  }
`;

export const ButtonCircleGreylight = styled(Button)`
  ${baseStyleButton({
    bgColor: vars.greyLight,
    textColor: vars.white,
  })}

  min-height: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0;
  box-shadow: none;

  svg {
    display: flex;
    height: 18px;

    line {
      color: ${vars.greyDark};
      stroke-width: 3px;
    }
  }
`;

export const LabelWhiteSecondary = styled(Label)`
  ${bgWhiteTextSecondary}
`;