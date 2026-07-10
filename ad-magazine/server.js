const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const ROOT = __dirname;

// 豆包 / 火山方舟配置（未配置时自动回退到模拟分析）
const DOUBAO_API_KEY = process.env.DOUBAO_API_KEY || '';
const DOUBAO_MODEL = process.env.DOUBAO_MODEL || 'doubao-lite-4k';
const DOUBAO_ENDPOINT = process.env.DOUBAO_ENDPOINT || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.js': 'application/javascript',
};

function getSimulatedAnalysis() {
  return '基于当前演示数据，可从以下三方面优化：\n\n' +
    '1. 内容策略：室内设计（92分）与建筑（78分）是最受关注的品类，建议在首页和 杂志橱窗 页面继续强化高质量的室内与建筑案例；生活方式（45分）与广告灵感（55分）关注度相对较低，可通过专题策划、场景化内容或跨界合作提升吸引力。\n\n' +
    '2. 用户地域：纽约、伦敦、东京三城合计贡献约 60% 的访问，说明品牌在英语国家与东亚市场已有较高认知。可针对这些地区增加本地化内容（如当地设计师访谈、区域活动），同时在上海、悉尼等新兴市场加大推广投入。\n\n' +
    '3. 转化路径：从 12,580 人访问到仅 20 人提交订单，整体转化率极低。建议在详情页增设更明显的联系入口、案例集下载或订阅引导，并简化联系表单，降低用户流失。';
}

function requestJson(apiUrl, headers, body) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(apiUrl);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 443,
      path: parsed.path,
      method: 'POST',
      headers: headers
    };
    const request = https.request(options, (response) => {
      let data = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        resolve({ status: response.statusCode, body: data });
      });
    });
    request.on('error', reject);
    request.write(body);
    request.end();
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // AI 分析代理接口
  if (req.method === 'POST' && pathname === '/api/ai-analysis') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || '';
        const model = payload.model || DOUBAO_MODEL;
        const apiKey = payload.apiKey || DOUBAO_API_KEY;

        if (!apiKey) {
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ simulated: true, content: getSimulatedAnalysis() }));
          return;
        }

        const requestBody = JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: '你是一位数据洞察分析师，擅长用简洁中文解释网站数据并给出可落地的建议。' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 800
        });

        const apiRes = await requestJson(DOUBAO_ENDPOINT, {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody),
          'Authorization': `Bearer ${apiKey}`
        }, requestBody);

        if (apiRes.status < 200 || apiRes.status >= 300) {
          res.writeHead(apiRes.status, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ error: 'Doubao API 请求失败', detail: apiRes.body }));
          return;
        }

        const data = JSON.parse(apiRes.body);
        const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
          ? data.choices[0].message.content.trim()
          : '';
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ content: content }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
