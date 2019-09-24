import React, { forwardRef } from 'react';
// import * as Icons from '@codesandbox/template-icons';
import history from 'app/utils/history';
// import getIcon from '@codesandbox/common/lib/templates/icons';
import { sandboxUrl } from '@codesandbox/common/lib/utils/url-generator';
import { useOvermind } from 'app/overmind';
import {
  Container,
  Icon,
  Details,
  Row,
  Title,
  Environment,
  Author,
} from './elements';

interface ISandboxCard {
  template: any;
  official?: boolean;
}

export const SandboxCard: React.FC<ISandboxCard> = forwardRef(
  ({ template, official }, ref) => {
    // @ts-ignore
    const { source, id: sandboxID, author = {} } = template.sandbox || {};
    // const UserIcon =
    //   template.iconUrl && Icons[template.iconUrl]
    //     ? Icons[template.iconUrl]
    //     : getIcon((source || {}).template);

    // const OfficialIcon = getIcon(template.name);
    const { actions } = useOvermind();
    const title =
      template.niceName || template.sandbox.title || template.sandbox.id;

    const openSandbox = (openNewWindow = false, o) => {
      const url = o
        ? sandboxUrl({ id: template.shortid })
        : sandboxUrl({ id: sandboxID });

      if (openNewWindow === true) {
        window.open(url, '_blank');
      } else {
        history.push(url);
      }

      return actions.modalClosed();
    };

    return (
      <>
        <Container
          ref={ref}
          onClick={event => {
            const cmd = event.ctrlKey || event.metaKey;
            openSandbox(Boolean(cmd), official);
          }}
        >
          <Icon color={template.color}>
            {/* {official ? <OfficialIcon /> : <UserIcon />} */}
          </Icon>
          <Details>
            <Row>
              <Title>{title}</Title>
            </Row>
            <Row>
              <Environment>{template.name || source.template}</Environment>
              <Author>By: {author.username || 'CodeSandbox'}</Author>
            </Row>
          </Details>
        </Container>
      </>
    );
  }
);
