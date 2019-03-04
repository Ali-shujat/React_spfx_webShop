import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebShopOnlineWebPartStrings';
import WebShopOnline from './components/WebShopOnline';
import { IWebShopOnlineProps } from './components/IWebShopOnlineProps';
import { IGetDataService, PNPDataService } from './Service'

export interface IWebShopOnlineWebPartProps {
  description: string;
}

export default class WebShopOnlineWebPart extends BaseClientSideWebPart<IWebShopOnlineWebPartProps> {


  public render(): void {
    let service: IGetDataService;
    service = new PNPDataService();

    service.getData().then((result) => {
      const element: React.ReactElement<IWebShopOnlineProps> = React.createElement(
        WebShopOnline,
        {
          description: this.properties.description,
          products: result,
          saveOrderData: service.saveOrderData,
          saveOrderRowData: service.saveOrderRowData,
          getOrderData: service.getOrderData
        }
      );

      ReactDom.render(element, this.domElement);
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
