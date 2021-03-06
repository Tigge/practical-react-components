/**
 * Dialog
 *
 * The Dialog component consists of a title with optional right-side menu, a
 * bottom control section with buttons, and a variable content which is
 * scrollable when the size gets too small.
 *
 * To build up the content, you can just add elements into the dialog body,
 * which will then get the default padding. Use the appropriate sections from
 * the dialog contents to adapt.
 *
 * The title will automatically be ID-ed for ARIA conformance.
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useScrollPosition } from 'react-hooks-shareable'

import { Typography } from '../Typography'
import { IModalProps } from '../Modal'
import { Header } from '../Dialog/components/Header'
import { Footer } from '../Dialog/components/Footer'
import { MainSection } from '../Dialog/components/Content'
import { BaseDialog, DialogWidth } from './BaseDialog'

export const HeaderTitle = styled(Typography).attrs({
  variant: 'dialog-heading',
})`
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -moz-box-orient: vertical;
  overflow: hidden;
`

export interface IDialogProps extends IModalProps {
  /**
   * Adjusts the width of the panel.
   */
  readonly width?: DialogWidth
  /**
   * React element that will go into the top of the dialog.
   */
  readonly header?: ReactNode
  /**
   * React element that will go into the bottom of the dialog.
   */
  readonly controls: ReactNode
  /**
   * If `true`, puts the modal dialog into focus.
   * AlertDialog, ConfirmDialog don't have input in the content,
   * and they should have `focusDialog={true}`.
   *
   * Default: `true`
   */
  readonly focusDialog?: boolean
}

export const Dialog: React.FC<IDialogProps> = ({
  width,
  header,
  controls,
  focusDialog = true,
  children,
  ...modalProps
}) => {
  const { atTop, atBottom, scrollRef } = useScrollPosition()

  return (
    <BaseDialog
      focusDialog={focusDialog}
      width={width}
      verticallyCenter={true}
      header={
        header !== undefined ? (
          <Header shadowHidden={atTop !== false}>{header}</Header>
        ) : null
      }
      footer={<Footer shadowHidden={atBottom !== false}>{controls}</Footer>}
      {...modalProps}
    >
      <MainSection scrollRef={scrollRef} hasHeader={header !== undefined}>
        {children}
      </MainSection>
    </BaseDialog>
  )
}
