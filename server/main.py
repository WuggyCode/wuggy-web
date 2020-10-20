import asyncio
import time
import os
from fastapi import FastAPI, Request, Response, HTTPException, Query
from fastapi.responses import JSONResponse
from wuggy.generators.wuggygenerator import WuggyGenerator
from typing import Dict, Optional
from fastapi.middleware.cors import CORSMiddleware
# g = WuggyGenerator()
# # TODO: create separate WuggyGenerators for each language with the plugins preloaded on server launch
# g.load("orthographic_english")
# for sequence in g.generate_simple("car"):
#     print(sequence)

environment = os.environ.get("ENV", "development")
if environment == "production":
    print("Wuggy Server is set to production mode. All supported language plugins will be loaded.")
    language_plugins_to_load = WuggyGenerator.supported_language_plugins.keys()
else:
    print("Wuggy Server is set to development mode. Only a subset of language plugins will be loaded.")
    language_plugins_to_load = ["orthographic_english"]

wuggy_generators: Dict[str, WuggyGenerator] = {}
for language_plugin_name in language_plugins_to_load:
    print(f"Loading language plugin {language_plugin_name}")
    generator = WuggyGenerator()
    generator.load(language_plugin_name)
    wuggy_generators[language_plugin_name] = generator

print(
    f"Starting Wuggy server with the following loaded language plugins: {wuggy_generators.keys()}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def timeout_longstanding_requests(request: Request, call_next):
    """
    Middleware to timeout requests automatically (based on https://github.com/tiangolo/fastapi/issues/1752).
    This middleware is important since a user can query a pseudoword with unexpected arguments, perhaps leading to infinite search.
    Timing out such requests means the Wuggy server will not get stuck on unservable requests.
    """
    try:
        return await asyncio.wait_for(call_next(request), timeout=20)

    except asyncio.TimeoutError:
        return JSONResponse({'detail': 'Request processing time excedeed limit, try again with different parameters.'},
                            status_code=504)


@app.get("/generate")
async def generate_simple(referenceSequence: Optional[str] = Query(..., max_length=50), languagePlugin: Optional[str] = Query("orthographic_english", max_length=50)):
    """
    Example query:
    """
    await asyncio.sleep(5)
    if languagePlugin in wuggy_generators:
        wuggy_generator = wuggy_generators[languagePlugin]
        pseudowords = []
        for sequence in wuggy_generator.generate_simple(referenceSequence):
            pseudowords.append(sequence)
            if len(pseudowords) == 10:
                break
        return { "word": referenceSequence, "matches": pseudowords }
