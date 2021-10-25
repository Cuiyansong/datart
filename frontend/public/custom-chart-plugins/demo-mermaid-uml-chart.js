/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function DemoMermaidUMLChart({ dHelper }) {
  return {
    config: {
      datas: [],
      styles: [
        {
          label: 'code.title',
          key: 'code',
          comType: 'group',
          rows: [
            {
              label: 'code.area',
              key: 'area',
              comType: 'code',
              options: {
                style: {
                  height: '600px',
                },
              },
            },
          ],
        },
        {
          label: 'watermark.title',
          key: 'watermark',
          comType: 'group',
          rows: [
            {
              label: 'watermark.area',
              key: 'area',
              comType: 'code',
              options: {
                style: {
                  height: '50px',
                },
              },
            },
          ],
        },
      ],
      settings: [],
      i18ns: [
        {
          lang: 'zh-CN',
          translation: {
            code: {
              title: '代码设置',
              area: '编辑区',
            },
            watermark: {
              title: '水印设置',
              area: '编辑区',
            },
          },
        },
        {
          lang: 'en',
          translation: {
            code: {
              title: 'Code Setting',
              area: 'Editor Block',
            },
            watermark: {
              title: 'Watermark Setting',
              area: 'Editor Block',
            },
          },
        },
      ],
    },
    isISOContainer: 'demo-mermaid-uml-chart',
    dependency: [
      'https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.13.3/mermaid.min.js',
    ],
    meta: {
      id: 'demo-mermaid-uml-chart',
      name: '[DEMO]Mermaid UML',
      icon: 'chart',
      requirements: [
        {
          group: null,
          aggregate: null,
        },
      ],
    },

    onMount(options, context) {
      if (context.document) {
        var elemDiv = context.document.createElement('div');
        context.document.body.appendChild(elemDiv);
        context.document.body.innerHTML = `<div id="my-mermaid" class="mermaid"></div>`;
      }

      if ('mermaid' in context.window) {
        this.chart = context.window.mermaid.mermaidAPI;
        this.chart.initialize({
          startOnLoad: false,
        });
      }
    },

    onUpdated(options, context) {
      const styles = options.config.styles;
      const code = dHelper.getStyleValueByGroup(styles, 'code', 'area');
      const watermark = dHelper.getStyleValueByGroup(
        styles,
        'watermark',
        'area',
      );
      var outputDiv = context.document.getElementById('my-mermaid');

      this.chart.render('theGraph', code, function (svgCode) {
        outputDiv.style.position = 'relative';
        outputDiv.style.overflow = 'hidden';
        outputDiv.style.margin = '20px';
        outputDiv.innerHTML = svgCode;
      });
      this.addWatermark(outputDiv, watermark, context);
    },

    onUnMount() {
      // this.chart && this.chart.dispose();
    },

    onResize(opt, context) {
      // this.chart && this.chart.resize(context);
    },

    addWatermark(targetEle, watermark, context) {
      if (!watermark) {
        return;
      }
      const watermarkDiv = context.document.createElement('div');
      watermarkDiv.style.position = 'absolute';
      watermarkDiv.style.left = '-50%';
      watermarkDiv.style.top = '-50%';
      watermarkDiv.style.width = '200%';
      watermarkDiv.style.height = '200%';
      watermarkDiv.style.color = '#f1f1f1';
      watermarkDiv.style['line-height'] = '90px';
      watermarkDiv.style['z-index'] = 1;
      watermarkDiv.style['font-size'] = '18px';
      watermarkDiv.style['-webkit-transform'] = 'rotate(-45deg)';
      watermarkDiv.style['-webkit-transform'] = 'rotate(-45deg)';
      watermarkDiv.innerHTML = `
          <p>${Array(Math.ceil((1 / watermark.length) * 2000))
            .fill(`${watermark}`)
            .join(Array(20).fill('&nbsp;').join(' '))}</p>
        `;
      targetEle.appendChild(watermarkDiv);
    },
  };
}
