// <copyright file="ProxyController.cs" company="LetterBot Limited">
//     Copyright (c) LetterBot Limited. All rights reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.
// </copyright>

using AspNetCore.Proxy;
using AspNetCore.Proxy.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace souls_not_lost.Controllers
{
    [ApiController]
    [Route("api")]
    public class ProxyController : ControllerBase
    {
        private readonly ApiSettings apiSettings;
        private HttpProxyOptions _httpOptions;

        public ProxyController(IOptions<ApiSettings> apiSettings)
        {
            this.apiSettings = apiSettings.Value;
        }

        [Route("handle/{**path}")]
        public async Task Handle(string path)
        {
            _httpOptions = HttpProxyOptionsBuilder
                .Instance
                .WithBeforeSend((c, hrm) =>
                {
                    return Task.CompletedTask;
                })
                .Build();
            await this.HttpProxyAsync($"{apiSettings.Url}/{path}{HttpContext.Request.QueryString}", _httpOptions);
        }
    }
}