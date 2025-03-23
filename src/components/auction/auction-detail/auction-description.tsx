/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  LucideChevronsDown,
  LucideChevronsUp,
  LucideLanguages
} from 'lucide-react'
import { memo, useEffect, useMemo, useRef, useState } from 'react'

const AuctionDescription = ({
  description
}: {
  description: string
  code: string
}) => {
  const [showMore, setShowMore] = useState(false)
  const desRef = useRef<HTMLDivElement>(null)
  const obsTslRef = useRef<MutationObserver>(null)
  const [translatedContent, setTranslatedContent] = useState('')
  const [showTranslated, setShowTranslated] = useState(false)
  const descriptionContent = useMemo(() => {
    if (showTranslated && translatedContent) {
      return translatedContent
    }
    return description
  }, [description, translatedContent, showTranslated])

  useEffect(() => {
    let script: any = null
    // Kiểm tra nếu Google Translate chưa được nhúng
    if (
      !(window as any).googleTranslateElementInit &&
      !(window as any).google &&
      !(window as any).google?.translate
    ) {
      const date = new Date()
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000)
      document.cookie =
        'googtrans=/ja/vi; path=/; expires=' +
        date.toUTCString() +
        '; HttpOnly; Secure; SameSite=None;'
      script = document.createElement('script')
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    const _obsTslRef = obsTslRef
    const _desRef = desRef
    if (!_obsTslRef.current && _desRef.current) {
      const lastContent = _desRef.current.innerText
      _obsTslRef.current = new MutationObserver((mutations, obs) => {
        if (_desRef.current?.innerText != lastContent) {
          console.log('Dịch xong rồi!')
          setTranslatedContent(_desRef.current?.innerHTML || '')
          setShowTranslated(true)
          obs.disconnect()
        }
      })
      _obsTslRef.current.observe(_desRef.current, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      _obsTslRef.current?.disconnect()
    }
  }, [])

  const translateDiv = () => {
    if (showTranslated) {
      setShowTranslated(false)
    } else {
      if (!translatedContent) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'ja',
            includedLanguages: 'vi',
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'translate-content'
        )
      } else {
        setShowTranslated(true)
      }
    }
  }
  return (
    <div>
      <div className="flex p-2 text-lg font-semibold">
        <div className="flex-1">Mô tả</div>
        <Button
          className={showTranslated ? 'text-primary' : ''}
          variant="secondary"
          onClick={translateDiv}
        >
          Dịch
          <LucideLanguages />
        </Button>
      </div>
      <div
        ref={desRef}
        id="translate-content"
        className={
          'translate relative w-full overflow-x-auto overflow-y-hidden' +
          (showMore ? ' max-h-max' : ' max-h-80')
        }
        dangerouslySetInnerHTML={{ __html: descriptionContent }}
      ></div>

      <div className="relative right-0 text-center">
        {!showMore && (
          <div className="absolute bottom-full left-0 h-40 w-full bg-gradient-to-t from-background to-transparent"></div>
        )}
        <Button
          className="m-0"
          variant="link"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? (
            <>
              Thu gọn <LucideChevronsUp />
            </>
          ) : (
            <>
              Xem thêm <LucideChevronsDown />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default memo(AuctionDescription)
