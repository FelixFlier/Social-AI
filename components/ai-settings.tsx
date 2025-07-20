"use client"

import { useSettingsStore } from "@/lib/settings-store"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const AISettings = () => {
    const {
        brandVoice,
        customInstructions,
        contentPreferences,
        updateBrandVoice,
        setCustomInstructions,
        setUseEmojis,
        setSuggestHashtags,
        setIncludeCTA,
      } = useSettingsStore()

    return (
        <Card className="glass-card mb-6">
        <CardHeader>
            <CardTitle>Brand Voice & Style</CardTitle>
            <CardDescription>
            Configure how AI generates content for your brand
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
            <Label className="text-base font-medium">Brand Voice</Label>
            <RadioGroup value={brandVoice} onValueChange={updateBrandVoice} className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                <Label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="professional" />
                    <div>
                    <div className="font-medium">Professional</div>
                    <div className="text-sm text-gray-500">Formal, authoritative tone</div>
                    </div>
                </Label>
                <Label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="casual" />
                    <div>
                    <div className="font-medium">Casual</div>
                    <div className="text-sm text-gray-500">Friendly, conversational</div>
                    </div>
                </Label>
                <Label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="playful" />
                    <div>
                    <div className="font-medium">Playful</div>
                    <div className="text-sm text-gray-500">Fun, creative, engaging</div>
                    </div>
                </Label>
                <Label className="flex items-center space-x-3 cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="educational" />
                    <div>
                    <div className="font-medium">Educational</div>
                    <div className="text-sm text-gray-500">Informative, helpful</div>
                    </div>
                </Label>
                </div>
            </RadioGroup>
            </div>

            <div>
            <Label htmlFor="custom-instructions" className="text-base font-medium">
                Custom Brand Instructions
            </Label>
            <Textarea
                id="custom-instructions"
                placeholder="Describe your brand personality, key messages, tone preferences..."
                className="mt-2 min-h-[100px]"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
                These instructions will be included in all AI content generation requests.
            </p>
            </div>

            <div>
            <Label className="text-base font-medium">Content Preferences</Label>
            <div className="mt-2 space-y-3">
                <div className="flex items-center justify-between">
                <Label htmlFor="emoji-usage">Use Emojis</Label>
                <Switch id="emoji-usage" checked={contentPreferences.useEmojis} onCheckedChange={setUseEmojis} />
                </div>
                <div className="flex items-center justify-between">
                <Label htmlFor="hashtag-suggestions">Suggest Hashtags</Label>
                <Switch id="hashtag-suggestions" checked={contentPreferences.suggestHashtags} onCheckedChange={setSuggestHashtags} />
                </div>
                <div className="flex items-center justify-between">
                <Label htmlFor="call-to-action">Include Call-to-Actions</Label>
                <Switch id="call-to-action" checked={contentPreferences.includeCTA} onCheckedChange={setIncludeCTA} />
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}

export default AISettings;
